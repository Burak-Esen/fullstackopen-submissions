import React, { useState, useEffect } from 'react'
import PersonForm from './Components/PersonForm'
import Filter from "./Components/Filter"
import Persons from "./Components/Persons"
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filt , setFilt ] = useState('')

  useEffect(()=>{
    async function Respond(){
      const promise = await axios.get("http://localhost:3001/persons")
      setPersons(promise.data)
    }
    Respond().catch(e => {
      console.log('There has been a problem with your fetch operation: ' + e.message);
    });
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

      <Persons persons={persons} filt={filt} />
    </div>
  )
}

export default App