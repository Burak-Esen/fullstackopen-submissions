import React, { useState, useEffect } from 'react'
import PersonForm from './Components/PersonForm'
import Filter from "./Components/Filter"
import Persons from "./Components/Persons"
import peopleService from './services/peopleService'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filt , setFilt ] = useState('')

  useEffect(()=>{
    peopleService.getAll().then(response=>{
    setPersons(response.data)
    })
  },[])
  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilt={setFilt}/>

      <h2>add a new</h2>

      <PersonForm 
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}/>

      <h2>Numbers</h2>

      <Persons persons={persons} setPersons={setPersons} filt={filt} />
    </div>
  )
}

export default App