const notificationReducer = (state=null, action) => {
  switch (action.type) {
    case 'MAKE':
      state = action.data
      break
    case 'STOP':
      state = null
      break
    default:
      return state
  }
  return state
}

export const makeNotification = message => {
  return async dispatch => {
    setTimeout(()=>dispatch(stop()), 3000)
    dispatch({
      type:'MAKE',
      data:message
    })
  }   
}

const stop = () => {
  return {
    type:'STOP'
  }
}

export default notificationReducer
