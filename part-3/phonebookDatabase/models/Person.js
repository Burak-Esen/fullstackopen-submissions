const mongoose = require('mongoose')
require('dotenv').config()
const url = process.env.MONGODB_URI.replace("{0}",process.env.PASSWORD)

console.log(url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).catch(e=>{})
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id=returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)