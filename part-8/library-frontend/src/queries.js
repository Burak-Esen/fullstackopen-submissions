import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
query allBooks ($author: String) {
  allBooks (author: $author) {
    title
    author{
      name
      id
    }
    published
    id
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`

export const SET_BIRTH = gql`
mutation setBirth($name: String!, $birth: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $birth
  ) {
    id
  }
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]){
  addBook(
    title: $title,
    authorName: $author,
    published: $published,
    genres: $genres
  ) {
    id
  }
}
`

export const LOGIN = gql`
mutation login($username:String!, $password:String!) {
  login(username:$username, password:$password){
    value
  }
}
`
