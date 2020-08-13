import React from 'react'

const Filter = (props) => {
  const filterResultOnCh = event =>{
    props.setFilt(event.target.value)
  }
  return (
    <div>
      filter shown with <input onChange={filterResultOnCh}/>
    </div>
  )
}

export default Filter
