const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
let morgan = require('morgan')
const cors = require('cors')
let Person = require('./models/Person')
const PORT = process.env.PORT

const logger =morgan(':method route::url status::status req.body-len::req[content-length] res.body-len::res[content-length] req.body::req-body - :response-time ms')
morgan.token('req-body', function (req, res) { return JSON.stringify(req.body) })
const app = express()
app.use(express.json())
app.use(logger)
app.use(cors())
app.use(express.static('build'))

let people=[];

Person.find({}).then(result => {
  result.forEach(person => {
    people.push(person)
  })
}).catch(error=>{
  console.log('error occured while request data of people from mongoDB')
  console.log(error)
})


app.get('/info', (req, res)=>{
  res.send(`<p>Phonebook has info for ${people.length} people</p>
  <p>${new Date()}</p>`)
})

app.get('/api/people', (req, res) => {
  Person.find({}).then(result => {
    if(result){
      res.json(result).end()
    }else{
      res.status(400).end()
    }
  }).catch(error=>{
    console.log('error occured while request data of people from mongoDB')
    console.log(error)
    res.status(500).end()
  })
})

app.get('/api/people/:id', (request, response) => {
  Person.findById(request.params.id.toString())
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    }).catch(error => {
      console.log(error)
      response.status(500).end()
    })
})
// app.get('/api/people/:id', (req, res) => {
//   const id = parseInt(req.params.id)
//   const person = people.find(person => person.id === id)
//   if (person) {
//     res.json(person)
//   } else {
//     res.status(404).end()
//   }
// })

app.put('/api/people/:id',(request,response)=>{
  let personToChange = people.find(person=>person.name===request.body.name)
  if(!personToChange){
    response.status(404).end()
  }
  personToChange = request.body
  const id = request.params.id
  Person.findOneAndUpdate( {_id:id},{ $set: request.body}, function (err){
    if(err){
      console.log(err)
      response.status(501).end()
    }else{
      response.status(204).end()
    }
  }).catch(e=>{response.status(501).end()})
})

app.delete('/api/people/:id', (req, res) => {
  const id = req.params.id
  Person.deleteOne({_id:id},function (err){
    if(err){
      console.log(err)
      res.status(400).end()
    }else{
      people = people.filter(person => person.id !== id)
      res.status(204).end()
    }
  }).catch(e=>{
    res.status(501).end()
  })
})
const generateId = () => {
  const id = Math.round(Math.random()*10000000000)
  return id
}

app.post('/api/people', (request, response) => {
  const person = request.body
  if (!person.name && !person.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }else if(!people.every(p=>p.name!==person.name)){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  person.id = generateId()
  people = people.concat(person)
  const readyPerson = new Person(person)
  readyPerson.save()//Id old one it must change!!!!!!!!!!!!!!!!!!
  response.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).end()
}
app.use(unknownEndpoint)

app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`))
