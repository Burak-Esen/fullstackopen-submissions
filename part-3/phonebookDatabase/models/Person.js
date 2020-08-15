const mongoose = require('mongoose')
require('dotenv').config()
const url = process.env.MONGODB_URI.replace("{0}",process.env.PASSWORD)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)