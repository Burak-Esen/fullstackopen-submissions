import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })
  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('libraryapp-user-token', token)
    }
  }, [result.data]) // eslint-disable-line
  const submitHandler = e => {
    e.preventDefault()
    login({ variables: { username, password } })
    setPage('authors')
  }
  return ( show
    ? <div>
        <br/>
        <form >
          name: <input 
            type="text"
            onChange={({target})=>setUsername(target.value)}
            autoComplete="username"
            />
          <br/>
          passw:<input
            type="password"
            autoComplete="current-password"
            onChange={({target})=>setPassword(target.value)}
            />
          <br/>
          <button type="submit" onClick={submitHandler}>Login</button>
        </form>
      </div>
    : null
  )
}

export default LoginForm
