import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { getAccessToken } from './authStorage'

const APOLLO_URI =
  process.env.EXPO_PUBLIC_APOLLO_URI || 'http://localhost:4000/graphql'

const httpLink = createHttpLink({ uri: APOLLO_URI })

const authLink = setContext(async (_, { headers }) => {
  const token = await getAccessToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default apolloClient
