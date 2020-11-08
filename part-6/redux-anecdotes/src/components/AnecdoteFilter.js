import React from 'react'
import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const dispatch=useDispatch()
  const filterHandler = event => {
    dispatch(filterAnecdotes(event.target.value))
  }
  return (
    <div style={{marginTop:"0.7rem", marginBottom:"0.7rem"}}>
      Filter: <input onChange={filterHandler}/>
    </div>
  )
}

export default AnecdoteFilter
