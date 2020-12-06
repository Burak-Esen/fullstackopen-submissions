import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import BaseRouter from './routes'
import Notification from './components/Notification'
import Navigation from './components/Navigation'

const App = () => {
  const headerClasses="text-4xl ml-1"
  return (
    <Router>
      <div className="bg-blue-100" style={{fontFamily:"sans-serif"}}>
        <Navigation />
        <h2 className={headerClasses}>Blog App</h2>
        <Notification />
        <BaseRouter />
      </div>
    </Router>
  )
}

export default App
