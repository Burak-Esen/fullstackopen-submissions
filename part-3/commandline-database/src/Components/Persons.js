import React from 'react'
import peopleService from '../services/peopleService'

const Persons = (props) => {
  const delHandler = e => {
    const name = e.target.getAttribute("name")
    const id = parseInt(e.target.getAttribute("val"))
    if (window.confirm("Delete " + name + " ?")) {
      delFromState(id)
      delFromDb(id)
      props.notif(`${name} is deleted`)
    }
  }
  const delFromState = (id) => {
    const people = props.persons.filter(p=>p.id!==id)
    props.setPersons(people)
  }
  const delFromDb = id => peopleService.del(id)

  return (
    <div>
      {props.persons.filter(person => person.name.toLowerCase().includes(props.filt)).map(person =>
        <p key={person.name}>
          <span >{person.name} {person.number}</span>
          <button onClick={delHandler} val={person.id} name={person.name}>delete</button>
        </p>
      )}
    </div>
  )
}

export default Persons
