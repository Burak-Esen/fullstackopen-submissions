const filterReducer = (state = "", action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}

export const filterAnecdotes = filterText =>{
  return {
    type:'SET_FILTER',
    filter:filterText
  }
}

export default filterReducer