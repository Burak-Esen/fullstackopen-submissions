const mongoose = require('mongoose')
require('dotenv').config()
const url = process.env.MONGODB_URI.replace('{0}',process.env.PASSWORD)
let uniqueValidator = require('mongoose-unique-validator')

//console.log(url)

mongoose.connect(url, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false,
  useCreateIndex: true
})
  .catch(e=>{console.log(e)})

const personSchema = new mongoose.Schema({
  name: {type:String, unique:true, minlength:3},
  number: {type:String, minlength: 8},
  id: String
})
personSchema.plugin(uniqueValidator)
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    if(returnedObject.id!==returnedObject._id){
      returnedObject.id=returnedObject._id
    }
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Person = mongoose.model('Person', personSchema)
// const error = asd.validateSync();
// assert.ok(error.errors['name', 'number']);
module.exports = Person