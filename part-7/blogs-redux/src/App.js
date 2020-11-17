import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import BaseRouter from './routes'
import Login from './components/Login'
import Notification from './components/Notification'

const App = () => {
  return (
    <Router>
      <div style={{fontFamily:"sans-serif"}}>
        <h2>Blogs</h2>
        <Login />
        <Notification />
        <BaseRouter />
      </div>
    </Router>
  )
}

export default App
