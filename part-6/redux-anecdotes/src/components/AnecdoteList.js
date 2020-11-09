import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote, initializeAnecdotes } from '../reducers/anecdoteActions'
import { makeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const anecdotes = useSelector(state => state.anecdotes.filter(anec => anec.content.toLowerCase().includes(state.filter.toLowerCase())))

  const vote = async (id) => {
    let votedAnec = anecdotes.find(anec=>anec.id===id)
    dispatch(voteAnecdote(votedAnec))
    const message='You voted ' + votedAnec.content
    dispatch(makeNotification(message))
    setTimeout(()=>dispatch(makeNotification('')), 5000)
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
