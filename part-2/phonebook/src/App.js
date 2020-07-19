import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const addHandler = (event) => {
    event.preventDefault()
    let personObj ={}
    personObj.name=newName
    setPersons(persons.concat(personObj))
    setNewName("")
    console.log(persons)
  }
  const newNameOnCh = (event) =>{
    setNewName(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addHandler}>
        <div>
          name: <input onChange={newNameOnCh} value={newName}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person=><p>{person.name}</p>)}
    </div>
  )
}

export default App