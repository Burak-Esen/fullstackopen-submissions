const {gql } = require('apollo-server')

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    genres: [String!]
    author: Author!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount : Int!
    allBooks(author: String, genre: String) : [Book!]!

    authorCount : Int!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]
    ): Book

    editAuthor(
      name: String!
      setBornTo:Int
    ): Author
  }
`
module.exports=typeDefs