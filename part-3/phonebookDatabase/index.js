const express = require('express')
require('dotenv').config()
let morgan = require('morgan')
const cors = require('cors')
let Person = require('./models/Person')
const PORT = process.env.PORT

const logger =morgan(':method route::url status::status req.body-len::req[content-length] res.body-len::res[content-length] req.body::req-body - :response-time ms')
morgan.token('req-body', function (req) { return JSON.stringify(req.body) })
const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(logger)
app.use(cors())

let people=[]

Person.find({}).then(result => {
  result.forEach(person => {
    people.push(person)
  })
}).catch(error=>{
  console.log(error.response.data)
})


app.get('/info', (req, res)=>{
  res.send(`<p>Phonebook has info for ${people.length} people</p>
  <p>${new Date()}</p>`)
})

app.get('/api/people', (req, res, next) => {
  Person.find({}).then(result => {
    if(result){
      res.json(result).end()
    }else{
      res.status(400).end()
    }
  }).catch(error=>{
    next(error)
  })
})

app.get('/api/people/:id', (request, response, next) => {
  Person.findById(request.params.id.toString())
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    }).catch(error => {
      next(error)
    })
})

app.put('/api/people/:id',(request,response)=>{
  let personToChange = people.find(person=>person.name===request.body.name)
  if(!personToChange){
    response.status(404).end()
  }
  personToChange = request.body
  const id = request.params.id

  Person.validate(request.body,['number']).then(()=>{
    Person.updateOne({_id:id},{ $set: request.body}, function (error){
      if(error){
        response.status(501).end()
      }else{
        response.status(204).end()
      }
    }).catch(error=>{response.status(500).json({error:error.response.data}).end()})
  }).catch(err=>{
    let validationErr= err.errors['number'].toString().split('\n')[0]
    response.status(400).json({error:validationErr}).end()
  })
  
})

app.delete('/api/people/:id', (req, res, next) => {
  const id = req.params.id
  Person.deleteOne({_id:id},function (err){
    if(err){
      console.log(err)
      res.status(400).end()
    }else{
      people = people.filter(person => person.id !== id)
      res.status(204).end()
    }
  }).catch(error=>{
    next(error)
  })
})

const generateId = () => {
  const id = Math.round(Math.random()*10000000000)
  return id
}
app.post('/api/people', (request, response, next) => {
  const person = request.body
  if (!person.name && !person.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  person.id = generateId()
  people = people.concat(person)
  const readyPerson = new Person(person)
  readyPerson.save()
    .then(()=>{return response.json(person)})
    .catch(error=>{
      next(error)
    })
})


const errorHandler = (error, request, response, next) => {
  //console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const unknownEndpoint = (request, response) => {
  response.status(404).end()
}
app.use(unknownEndpoint)

app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`))
