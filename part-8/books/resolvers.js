require('dotenv').config()
const { UserInputError, AuthenticationError } = require('apollo-server')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks:async (root, args) => {
      if(args.genre && args.author){
        const author = await Author.findOne({name:args.author})
        return Book.find({ author:author._id, genres:{ $elemMatch:{ $eq:args.genre } } }).populate('author')
      }
      else if (args.genre) return Book.find({ genres:{ $elemMatch:{ $eq:args.genre } } }).populate('author')
      else if (args.author){
        const author = await Author.findOne({name:args.author})
        return Book.find({ author : author._id }).populate('author')
      }
      return Book.find({}).populate('author')
    },
    authorCount: () => Author.collection.countDocuments(),
    allAuthors:() => Author.find({}),
    me: (root, args, { currentUser }) => {
      console.log(currentUser)
      return currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser })=>{
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      if(args.authorName && args.authorName.length<4){
        throw new UserInputError("author name must have at least 4 letter")
      }
      if(args.title && args.title.length<2){
        throw new UserInputError("title must have at least 2 letter")
      }
      const book = await Book.findOne({ title:args.title })
      if(book){
        throw new UserInputError("title must be unique")
      }
      const author = await Author.findOne({ name:args.authorName})
      const newBook = new Book({ ...args })
      let newAuthor;
      if(!author){
        newAuthor = new Author({
          name: args.authorName,
          bookCount:1
        })
        try {
          const returnedNewAuthor = await newAuthor.save()
          newBook.author=returnedNewAuthor
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }else{
        author.bookCount = author.bookCount + 1
        await author.save()
        newBook.author=author
      }
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook
    },
    editAuthor:async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = await Author.findOne({ name:args.name })
      if(!author){
        return null
      }
      author.born = args.setBornTo
      return author.save()
    },
    createUser: async (root, args) => {
      const newUser = new User({ ...args })
      try {
        return newUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username:args.username})
      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, process.env.SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers