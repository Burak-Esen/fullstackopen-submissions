const express = require('express')
let people = require('./db')
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send(`<h2>Welcome</h2>
  <p>Go to <a href="http://localhost:${PORT}/api/people">people API</a></p>`)
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

app.delete('/api/people/:id', (req, res) => {
  const id = parseInt(req.params.id)
  people = people.filter(person => person.id !== id)
  response.status(204).end()
})
const generateId = () => {
  const maxId = people.length > 0
    ? Math.max(...people.map(n => n.id))
    : 0
  return maxId + 1
}
app.post('/api/people', (request, response) => {
  const person = request.body
  if (!person.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  person.important = person.important || false
  person.date = new Date()
  person.id = generateId()
  people = people.concat(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`))