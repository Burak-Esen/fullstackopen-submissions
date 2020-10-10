import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  const setErrorMessageHandler = (message, isAnError) => {
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
        setErrorMessageHandler={setErrorMessageHandler} 
      />

      <Blogs user={user}
        blogs={blogs}
      />

    </div>
  )
}

export default App