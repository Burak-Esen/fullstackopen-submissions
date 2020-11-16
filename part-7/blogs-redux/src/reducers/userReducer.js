import userService from '../services/userService'

const userReducer = (state={ user:null, users:[] }, action) => {
  switch(action.type){
    case 'LOG_IN':
      state = { user:action.data.user, users:state.users }
      break
    case 'LOG_OUT':
      state = { user:null, users:state.users}
      break
    case 'GET_ALL_USER':
      state = { user:state.user, users:action.data.users}
      break
    default:
      return state
  }
  return state
}

export const login = loginObj =>{
  return async dispatch => {
    const user = await userService.login(loginObj)
    dispatch({
      type:'LOG_IN',
      data:{
        user,
      }
    })
  }
}

export const logout = () =>{
  return {
    type:'LOG_OUT',
    data:{
      user:null
    }
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    let users = await userService.getAll()
    dispatch({
      type:'GET_ALL_USER',
      data:{
        users,
      }
    })
  }
}

export default userReducer
