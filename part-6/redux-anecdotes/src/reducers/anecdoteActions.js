export const voteAnecdote = (id) => {
  return {
    type:'VOTE',
    data:{
      id:id
    }
  }
}

export const createAnecdote = (anecdoteObj) => {
  return {
    type:'CREATE',
    data:anecdoteObj
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type:'INITIALIZE',
    data:anecdotes
  }
}