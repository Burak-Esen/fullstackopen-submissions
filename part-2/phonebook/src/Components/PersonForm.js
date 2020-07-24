import React from 'react'
import peopleService from '../services/peopleService'

const PersonForm = (props) => {
  const addHandler = (event) => {
    event.preventDefault()
    if (props.persons.every(person => person.name !== props.newName)) {
      let personObj = {}
      personObj.name = props.newName
      personObj.number = props.newNumber
      personObj.id = props.persons.length + 1
      peopleService.create(personObj)
      props.setPersons(props.persons.concat(personObj))
      props.setNewName("")
      props.setNewNumber("")
      props.notif(`${personObj.name} is created`)
    } else {
      if (window.confirm(`${props.newName} is already added to phonebook, replace the old number with a new one?`)) {
        let person = props.persons.find(a => a.name === props.newName)
        person.number = props.newNumber
        peopleService.update(person.id, person)
        props.setPersons(props.persons.concat([]))
        props.notif(`${person.name} is updated`)
      }
      props.setNewName("")
      props.setNewNumber("")
    }
  }
  const newNameOnCh = (event) => {
    props.setNewName(event.target.value)
  }
  const newNumberOnCh = (event) => {
    props.setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={addHandler}>
      <div>
        name__: <input onChange={newNameOnCh} value={props.newName} />
      </div>
      <div>
        number: <input onChange={newNumberOnCh} value={props.newNumber} />
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  )
}

export default PersonForm