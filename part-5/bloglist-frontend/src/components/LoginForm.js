import React, { useState } from 'react'
import loginService from '../services/login'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    props.setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    if (username === '' || password === '') {
      props.notificationHandler('Enter Username and Password.', true)
      return null
    } else {
      try {
        const userAttemptLogin = await loginService.login({
          username: username, password: password
        })
        window.localStorage.setItem(
          'loggedBloglistAppUser', JSON.stringify(userAttemptLogin) // profile in the sore as a string
        )
        const parsedUser = JSON.parse(JSON.stringify(userAttemptLogin))
        props.setUser(parsedUser)
        setUsername('')
        setPassword('')
      } catch (e) {
        props.notificationHandler('Wrong credentials', true)
        props.setUser(null)
      }
    }
  }

  return (props.user === null ?
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    :
    <div>
      <span>{props.user.name} logged-in</span>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default LoginForm
