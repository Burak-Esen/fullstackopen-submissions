const notificationReducer = (state = { message:"", lastTimeoutId:NaN }, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      state = {message:action.notification, lastTimeoutId:action.timeoutId}
      break
    case 'CLEAR_NOTIFICATION':
      state = {...state, message:""}
      break
    default:
      return state
  }
  return state
}

export const makeNotification = (message, duration_sec, lastTimeoutId) =>{
  return async dispatch =>{
    clearTimeout(lastTimeoutId)
    const timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, duration_sec*1000)
    dispatch({
      type:'SET_NOTIFICATION',
      notification:message,
      timeoutId:timeoutId
    })
  }
  
}

export const clearNotification = () => {
  return {
    type:'CLEAR_NOTIFICATION'
  }
}
export default notificationReducer