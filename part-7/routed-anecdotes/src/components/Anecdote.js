import React from 'react'
import { useRouteMatch } from 'react-router-dom'

const Anecdote = (props) => {
  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match 
    ? props.anecdotes.find(anecdote => anecdote.id === match.params.id)
    : null
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Has {anecdote.votes} {anecdote.votes===1 ? 'vote' : 'votes'}</p>
      <p>For more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

export default Anecdote
