import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { setContext } from 'apollo-link-context'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('libraryapp-user-token')
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : null,
    }
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(new HttpLink({
    uri: 'http://localhost:4000',
  }))
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)