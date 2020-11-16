import React from 'react'
import Login from './components/Login'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Users from './components/Users'

const App = () => {
  return (
    <div style={{fontFamily:"sans-serif"}}>
      <h2>Blogs</h2>
      <Notification />
      <Login />
      <Blogs />
      <Users />
    </div>
  )
}

export default App
