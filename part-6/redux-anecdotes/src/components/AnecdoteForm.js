import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteActions'
import { makeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const newAnecdote = async (event) => {
    event.preventDefault()
    event.persist()
    const content = event.target.newAnecdote.value
    props.createAnecdote(content)
    props.makeNotification('You created a new anecdote: ' + content, 2)
    event.target.newAnecdote.value=''
  }
  return (
    <div style ={{marginBottom:'2rem'}}>
      <h3 style ={{marginBottom:0}}>create new</h3>
      <form onSubmit={newAnecdote}>
          <div><input name="newAnecdote" /></div>
          <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    createAnecdote: content => dispatch(createAnecdote(content)),
    makeNotification: (message, dur_sec) => dispatch(makeNotification(message, dur_sec))
  }
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
