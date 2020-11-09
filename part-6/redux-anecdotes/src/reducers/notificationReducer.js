const notificationReducer = (state = "", action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const makeNotification = (message, duration_sec) =>{
  return async dispatch =>{
    setTimeout(() => {
      dispatch(clearNotification())
    }, duration_sec*1000)
    dispatch({
      type:'SET_NOTIFICATION',
      notification:message
    })
  }
  
}

export const clearNotification = () => {
  return {
    type:'CLEAR_NOTIFICATION'
  }
}
export default notificationReducer