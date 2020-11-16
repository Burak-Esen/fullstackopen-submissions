import React from 'react'
import Login from './components/Login'
import Notification from './components/Notification'

const App = () => {
  return (
    <div style={{fontFamily:"sans-serif"}}>
      <h2>Blogs</h2>
      <Notification />
      <Login />
    </div>
  )
}

export default App
