import React from 'react'
import peopleService from '../services/peopleService'

const PersonForm = (props) => {
  const addHandler = (event) => {
    event.preventDefault()
    if(props.persons.every(person=>person.name!==props.newName)){
      let personObj ={}
      personObj.name=props.newName
      personObj.number=props.newNumber
      personObj.id=props.persons.length+1
      peopleService.create(personObj)
      props.setPersons(props.persons.concat(personObj))
      props.setNewName("")
      props.setNewNumber("")
    }else{
      alert(`${props.newName} is already added to phonebook`)
      props.setNewName("")
      props.setNewNumber("")
    }
  }
  const newNameOnCh = (event) =>{
    props.setNewName(event.target.value)
  }
  const newNumberOnCh = (event) =>{
    props.setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={addHandler}>
      <div>
        name__: <input onChange={newNameOnCh} value={props.newName}/>
      </div>
      <div>
        number: <input onChange={newNumberOnCh} value={props.newNumber}/>
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  )
}

export default PersonForm
