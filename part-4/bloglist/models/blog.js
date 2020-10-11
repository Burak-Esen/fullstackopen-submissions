const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true
  },
  category:String,
  url: {
    type:String,
    required:true
  },
  previewUrl:{
    type:String,
    default:null
  },
  author:String,
  likes:{
    type:Number,
    default:0
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
