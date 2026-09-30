import { GraphQLError } from 'graphql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import DataLoader from 'dataloader'
import Book from './models/book.js'
import Author from './models/author.js'
import User from './models/user.js'

// Batches all bookCount lookups into a single aggregation query,
// solving the n+1 problem of the allAuthors query (8.26).
const bookCountLoader = new DataLoader(async (authorIds) => {
  const counts = await Book.aggregate([
    { $match: { author: { $in: authorIds } } },
    { $group: { _id: '$author', count: { $sum: 1 } } }
  ])

  const countMap = {}
  counts.forEach((c) => {
    countMap[c._id.toString()] = c.count
  })

  return authorIds.map((id) => countMap[id.toString()] || 0)
})

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        filter.author = author ? author._id : null
      }
      if (args.genre) {
        filter.genres = args.genre
      }
      return Book.find(filter).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount: (author) => bookCountLoader.load(author._id)
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }

      const book = new Book({ ...args, author: author._id })
      await book.save()
      await book.populate('author')

      bookCountLoader.clearAll()
      context.pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      return author.save()
    },
    createUser: async (root, args) => {
      const passwordHash = await bcrypt.hash('secret', 10)
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
        passwordHash
      })

      return user.save().catch((error) => {
        throw new GraphQLError('creating the user failed', {
          extensions: { code: 'BAD_USER_INPUT', error }
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || !(await bcrypt.compare(args.password, user.passwordHash))) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.SECRET
      )

      return { value: token }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: (root, args, context) =>
        context.pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

export default resolvers
