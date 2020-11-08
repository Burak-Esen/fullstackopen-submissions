import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteActions'
import { makeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const message="You voted " + anecdotes.find(anec=>anec.id===id).content
    dispatch(makeNotification(message))
  }

  return anecdotes.map(anecdote =>
    <div style ={{marginBottom:'0.7rem', backgroundColor:'gainsboro'}} key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

export default AnecdoteList
