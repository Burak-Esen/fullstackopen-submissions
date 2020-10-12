import React, { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'
import './App.css'


const App = () => {
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const [blogs, setBlogs] = useState([])
  const noteFormRef = useRef()

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedBloglistAppUser'))
    if(loggedUser){
      setUser(loggedUser)
    }
  }, [])

  const getTokenFromWindow = () => {
    if(window.localStorage.getItem('loggedBloglistAppUser')) {
      return (JSON.parse(window.localStorage.getItem('loggedBloglistAppUser'))).token
    }else{
      return null
    }
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
        notificationHandler={notificationHandler}
      />

      {user!==null ?
        <Togglable buttonLabel="New Blog" ref={noteFormRef} >
          <CreateBlogForm getTokenFromWindow={getTokenFromWindow}
            notificationHandler={notificationHandler}
            setBlogs={setBlogs} />
        </Togglable> : []
      }

      <Blogs user={user}
        blogs={blogs}
        setBlogs={setBlogs}
        getTokenFromWindow={getTokenFromWindow}
        notificationHandler={notificationHandler} />
    </div>
  )
}

export default App