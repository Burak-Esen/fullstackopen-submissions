export const voteAnecdote = (id) => {
  return {
    type:'VOTE',
    data:{
      id:id
    }
  }
}

export const createAnecdote = (content) => {
  return {
    type:'CREATE',
    data:{
      content:content
    }
  }
}
