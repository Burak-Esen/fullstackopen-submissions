const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      let newState = state.concat()
      newState.find(anec => anec.id===action.data.id).votes += 1
      newState.sort((a,b)=>b.votes-a.votes)
      state = newState
      break
    case 'CREATE':
      state = [...state, action.data]
      break
    case 'INITIALIZE':
      state=action.data.sort((a,b)=>b.votes-a.votes)
      break
    default:
      return state
  }
  return state
}

export default anecdoteReducer
