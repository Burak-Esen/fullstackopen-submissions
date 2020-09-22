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
let isThereChangedId = false
let changedIdList = []

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    if(returnedObject.id!==returnedObject._id){
      isThereChangedId = true
      changedIdList.push(returnedObject.id)
      returnedObject.id=returnedObject._id
    }
    delete returnedObject._id
    delete returnedObject.__v
  }
})
let people = mongoose.model('Person', personSchema)
if(isThereChangedId){

}

module.exports = people