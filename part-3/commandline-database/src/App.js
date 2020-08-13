import React, { useState, useEffect } from 'react'
import PersonForm from './Components/PersonForm'
import Filter from "./Components/Filter"
import Persons from "./Components/Persons"
import peopleService from './services/peopleService'
import Notification from './Components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filt , setFilt ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ isError, setIsError ]=useState(false)
  const notif = (msg, isError=false) =>{
    setNotificationMessage(msg)
    setIsError(isError)
    setTimeout(()=>setNotificationMessage(null),3000)
    setTimeout(()=>setIsError(false),3000)
  }
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
      <Notification notificationMessage={notificationMessage} isError={isError} />
      <PersonForm 
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        notif={notif}/>

      <h2>Numbers</h2>

      <Persons
        persons={persons}
        setPersons={setPersons}
        notif={notif}
        filt={filt}/>

    </div>
  )
}

export default App