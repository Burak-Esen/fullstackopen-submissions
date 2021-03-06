const {gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

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
    me: User
  }

  type Mutation {
    addBook(
      title: String!,
      authorName:String!,
      published: Int!,
      genres: [String!]
    ): Book

    editAuthor(
      name: String!
      setBornTo:Int
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`
module.exports=typeDefs