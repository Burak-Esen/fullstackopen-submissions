const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
let morgan = require('morgan')
const cors = require('cors')
let Person = require('./models/Person')
const PORT = process.env.PORT
const url = process.env.MONGODB_URI.replace("{0}",process.env.PASSWORD)

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
    delete person.__v
    delete person._id
    people.push(person)
  })
})

app.get('/', (req, res) => {
  res.send(`<h2>Welcome</h2>
  <p>Go to <a href="http://localhost:${PORT}/api/people">people API</a></p>
  <p>Go to <a href="http://localhost:${PORT}/info">phonebook info</a></p>`)
})

app.get('/info', (req, res)=>{
  res.send(`<p>Phonebook has info for ${people.length} people</p>
  <p>${new Date()}</p>`)
})

app.get('/api/people', (req, res) => {
  res.json(people)
})

app.get('/api/people/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const person = people.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.put('/api/people/:id',(request,response)=>{
  personToChange=people.find(person=>person.name===request.body.name)
  if(!personToChange){
    response.status(404).end()
  }
  personToChange = request.body
  const id=parseInt(request.params.id)
  console.log(request.body)
  Person.findOneAndUpdate( {id:id},{ $set: request.body}, function (err){
    if(err){
      console.log(err)
      response.status(501).end()
    }else{
      response.status(204).end()
    }
  }).catch(e=>{response.status(501).end()})
})

app.delete('/api/people/:id', (req, res) => {
  const id = parseInt(req.params.id)
  console.log('delete running')
  Person.deleteOne({id:id},function (err){
    if(err){
      console.log('Mongo DB delete error')
      console.log(err)
      res.status(501).end()
    }
  }).catch(e=>{
    res.status(501).end()
  })
  people = people.filter(person => person.id !== id)
  res.status(204).end()
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
  readyPerson.save()
  response.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`))
