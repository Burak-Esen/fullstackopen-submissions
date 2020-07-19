import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const addHandler = (event) => {
    event.preventDefault()
    if(persons.every(person=>person.name!==newName)){
      let personObj ={}
      personObj.name=newName
      setPersons(persons.concat(personObj))
      setNewName("")
    }else{
      alert(`${newName} is already added to phonebook`)
      setNewName("")
    }
  }
  const newNameOnCh = (event) =>{
    setNewName(event.target.value)
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
      {persons.map(person=><p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App