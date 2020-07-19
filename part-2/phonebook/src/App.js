import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const addHandler = (event) => {
    event.preventDefault()
    if(persons.every(person=>person.name!==newName)){
      let personObj ={}
      personObj.name=newName
      personObj.number=newNumber
      setPersons(persons.concat(personObj))
      setNewName("")
      setNewNumber("")
    }else{
      alert(`${newName} is already added to phonebook`)
      setNewName("")
      setNewNumber("")
    }
  }
  const newNameOnCh = (event) =>{
    setNewName(event.target.value)
  }
  const newNumberOnCh = (event) =>{
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addHandler}>
        <div>
          name__: <input onChange={newNameOnCh} value={newName}/>
        </div>
        <div>
          number: <input onChange={newNumberOnCh}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person=><p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App