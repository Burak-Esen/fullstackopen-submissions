import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteActions'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = event => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.newAnecdote.value))
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

export default AnecdoteForm
