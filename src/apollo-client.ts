import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.STRAPI_URL + '/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
  headers: {
    Authorization: process.env.STRAPI_TOKEN ?? '',
  },
})

export default client
