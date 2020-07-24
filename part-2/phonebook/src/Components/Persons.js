import React from 'react'
import peopleService from '../services/peopleService'

const Persons = (props) => {
  const delHandler = e=>{
    const name=e.target.getAttribute("name")
    const id=parseInt(e.target.getAttribute("val"))
    if(window.confirm("Delete "+name+" ?")){
      delFromState(id)
      delFromDb(id)
    }
  }
  const delFromState = (id)=>{
    props.persons.splice(id-1 , 1)
    if(id!==props.persons.length+1){
      props.persons.filter(person=>person.id>id).map((person,i) =>person.id=i+id)
    }
    props.setPersons(props.persons.concat([]))
  }
  const delFromDb = id =>{
    peopleService.del(id)
    if(id===props.persons.length+1){
    }else{
      props.persons.filter(person=>person.id>=id).map((person,i)=>
        peopleService.del(id+i+1).then(()=>peopleService.create(person))
      )
    }
  }
  return (
    <div>
      {props.persons.filter(person=>person.name.toLowerCase().includes(props.filt)).map(person=>
          <p key={person.name}>
            <span >{person.name} {person.number}</span>
            <button onClick={delHandler} val={person.id} name={person.name}>delete</button>
          </p>
        )}
    </div>
  )
}

export default Persons
