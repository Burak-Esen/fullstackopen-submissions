import React from 'react'
import useField from '../customHooks/inputs'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../reducers/userReducer'
import { makeNotification } from '../reducers/notificationReducer'

const Login = () => {
  const username = useField('text')
  const secret = useField('password')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)

  const loginHandler = event => {
    event.preventDefault()
    dispatch(login({ username:event.target.username.value, secret:event.target.secret.value }))
    username.refresh()
    secret.refresh()
  }
  const logoutHandler = () =>{
    dispatch(logout())
    dispatch(makeNotification('Logged Out'))
  }
  return (
    <div>
      {user ? 
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      :
        <form onSubmit={loginHandler}>
          <h3>Login</h3>
          username:<input name="username"
            type={username.type}
            onChange={username.onChange}
            value={username.value}
            autoComplete="username"
          /><br/>
          secret___:<input name="secret"
            type={secret.type}
            onChange={secret.onChange}
            value={secret.value}
            autoComplete="current-password"
          /><br/>
          <button>Login</button>
        </form>
      }
    </div>
  )
}

export default Login
