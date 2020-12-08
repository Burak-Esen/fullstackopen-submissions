const { UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')

const resolvers = {
  Query: {
    bookCount:()=>books.length,
    allBooks:(root, args)=>{
      if(!args.author && !args.genre) return books
      else if(args.author && !args.genre) return books.filter(b=>b.author===args.author)
      else if(!args.author && args.genre) return books.filter(b=>b.genres.includes(args.genre))
      return books.filter(b=>b.author===args.author && b.genres.includes(args.genre))
    },
    authorCount:()=>authors.length,
    allAuthors:()=>{
      authors.forEach(a => a.bookCount=books.filter(b=>b.author===a.name).length)
      return authors
    }
  },
  Mutation: {
    addBook: (root, args)=>{
      if (books.find(b => b.title === args.title)) {
        throw new UserInputError('Book must be unique', {
          invalidArgs: args.name,
        })
      }
      if(!authors.map(a=>a.name).includes(args.author)){
        const newAuthor = {
          name: args.author,
          id: uuid(),
        }
        authors=authors.concat(newAuthor)
      }
      const newBook = { ...args, id:uuid() }
      books = books.concat(newBook)
      return newBook
    },
    editAuthor:(root, args) => {
      const author = authors.find(a=>a.name===args.name)
      if(!author){
        return null
      }
      author.born = args.setBornTo
      return authors.find(a=>a.name===args.name)
    }
  }
}

module.exports = resolvers