import 'dotenv/config'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws'
import { PubSub } from 'graphql-subscriptions'
import express from 'express'
import http from 'http'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import User from './models/user.js'
import typeDefs from './schema.js'
import resolvers from './resolvers.js'

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 4000

console.log('connecting to', MONGODB_URI)

mongoose.set('strictQuery', false)
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.error('error connecting to MongoDB:', error.message))

const pubsub = new PubSub()

const schema = makeExecutableSchema({ typeDefs, resolvers })

const app = express()

const httpServer = http.createServer(app)

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/'
})

const serverCleanup = useServer({ schema }, wsServer)

const server = new ApolloServer({
  schema,
  plugins: [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          }
        }
      }
    }
  ]
})

await server.start()

app.use(
  '/',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.startsWith('Bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser, pubsub }
      }
      return { pubsub }
    }
  })
)

httpServer.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`)
})
