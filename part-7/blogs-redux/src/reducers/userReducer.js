import userService from '../services/userService'

const userReducer = (state={ user:null, users:[] }, action) => {
  switch(action.type){
    case 'LOG_IN':
      state = { ...state, ...action.data }
      break
    case 'LOG_OUT':
      state = {...state, ...action.data}
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

export const getAllUsers = () => {
  return async dispatch => {
    let users = await userService.getAll()
    dispatch({
      type:'GET_ALL',
      data:{
        users,
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

export default userReducer
