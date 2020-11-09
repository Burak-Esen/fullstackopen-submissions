const notificationReducer = (state = "", action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const makeNotification = message =>{
  return {
    type:'SET_NOTIFICATION',
    notification:message
  }
}

export default notificationReducer