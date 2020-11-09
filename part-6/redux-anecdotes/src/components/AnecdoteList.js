import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { voteAnecdote, initializeAnecdotes } from '../reducers/anecdoteActions'
import { makeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { props.initializeAnecdotes() }, [])

  const vote = anecdote => {
    props.voteAnecdote(anecdote)
    props.makeNotification('You voted ' + anecdote.content, 5, props.timeoutId)
  }

  return props.anecdotes.map(anecdote =>
    <div style ={{marginBottom:'0.7rem', backgroundColor:'gainsboro'}} key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes.filter(anec => anec.content.toLowerCase().includes(state.filter.toLowerCase())),
    filter:state.filter,
    timeoutId:state.notification.lastTimeoutId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    initializeAnecdotes: () => dispatch(initializeAnecdotes()),
    voteAnecdote: anecdote => dispatch(voteAnecdote(anecdote)),
    makeNotification: (message, duration_sec, timeoutId) => dispatch(makeNotification(message,duration_sec, timeoutId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
