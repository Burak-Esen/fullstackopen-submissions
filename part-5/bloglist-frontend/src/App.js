import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedBloglistAppUser'))
    if(loggedUser){
      setUser(loggedUser)
    }
  }, [])
  
  const getTokenFromWindow = () => {
    return (JSON.parse(window.localStorage.getItem('loggedBloglistAppUser'))).token
  }

  const notificationHandler = (message, isAnError) => {
    setErrorMessage(message)
    setIsError(isAnError)
    setTimeout(() => {
      setErrorMessage(null)
      setIsError(false)
    }, 5000)
  }

  return (
    <div><h2>Blogs</h2>
      <Notification message={errorMessage} isError={isError} />
      <LoginForm user={user}
        setUser={setUser}
        notificationHandler={notificationHandler} />

      <Blogs user={user}
        getTokenFromWindow={getTokenFromWindow}
        notificationHandler={notificationHandler} />
    </div>
  )
}

export default App