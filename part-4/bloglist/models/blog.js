const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title:String,
  url:String,
  author:String,
  likes:Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
