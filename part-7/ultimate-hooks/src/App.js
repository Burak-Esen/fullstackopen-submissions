import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // ...

  const create = async (resource) => {
    await axios.post(baseUrl, resource)
    getAll()
  }

  const getAll = async () => {
    setResources((await axios.get(baseUrl)).data)
  }

  const service = {
    create,
    getAll
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.onChange({target:{value:''}})
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    name.onChange({target:{value:''}})
    number.onChange({target:{value:''}})
  }
  useEffect(() => {
    noteService.getAll()
    personService.getAll()
  }, [])

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes ? notes.map(n => <p key={n.id}>{n.content}</p>) : []}

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons ? persons.map(n => <p key={n.id}>{n.name} {n.number}</p>) : []}
    </div>
  )
}

export default App