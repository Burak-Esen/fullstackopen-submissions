import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import BaseRouter from './routes'
import Notification from './components/Notification'
import Navigation from './components/Navigation'

const App = () => {
  return (
    <Router>
      <div style={{fontFamily:"sans-serif"}}>
        <Navigation />
        <h2>Blog App</h2>
        <Notification />
        <BaseRouter />
      </div>
    </Router>
  )
}

export default App
