import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const AnecdoteFilter = (props) => {
  const filterHandler = event => props.filterAnecdotes(event.target.value)
  return (
    <div style={{marginTop:"0.7rem", marginBottom:"0.7rem"}}>
      Filter: <input onChange={filterHandler}/>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    filterAnecdotes: filterText => dispatch(filterAnecdotes(filterText))
  }
}

export default connect(null, mapDispatchToProps)(AnecdoteFilter)
