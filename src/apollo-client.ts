import { ApolloClient, InMemoryCache } from '@apollo/client'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'

if (process.env.NODE_ENV === 'development') {
  // Adds messages only in a dev environment
  loadDevMessages()
  loadErrorMessages()
}

const client = new ApolloClient({
  uri: process.env.STRAPI_URL + '/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
  headers: {
    Authorization: process.env.STRAPI_TOKEN ?? '',
  },
})

export default client
