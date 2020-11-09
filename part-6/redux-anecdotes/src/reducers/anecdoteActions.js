import { updateAnecdote, getAllAnecdotes, createNewAnecdote } from '../services/anecdoteService'

export const voteAnecdote = (anecdoteObj) => {
  return async dispatch => {
    await updateAnecdote(anecdoteObj)
    dispatch({
      type:'VOTE',
      data:{
        id:anecdoteObj.id
      }
    })
  } 
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdoteObj = await createNewAnecdote(content)
    dispatch({
      type:'CREATE',
      data:anecdoteObj
    })
  } 
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAllAnecdotes()
    dispatch({
      type:'INITIALIZE',
      data:anecdotes
    })
  }
}