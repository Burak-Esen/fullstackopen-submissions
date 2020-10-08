const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required:true,
    unique:true
  },
  name: {
    type:String
  },
  passwordHash:String,
  blogs:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Blog'//its Model name
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)
