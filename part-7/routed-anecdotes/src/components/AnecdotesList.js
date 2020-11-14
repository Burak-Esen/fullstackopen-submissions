import React from 'react'

const Main = (props) => {

  const anecdoteById = (id) => props.anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    props.setAnecdotes(props.anecdotes.map(a => a.id === id ? voted : a))
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {props.anecdotes.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>)}
      </ul>
    </div>
  )
}

export default Main
