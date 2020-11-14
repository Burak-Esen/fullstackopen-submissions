import React, { useState } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import Footer from './components/Footer'
import Menu from './components/Menu'
import BaseRouter from './Routes'

const App = () => {
  const [notification, setNotification] = useState('')
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  return (
    <Router>
      <h1>Software Anecdotes</h1>
      <Menu />
      <BaseRouter anecdotes={anecdotes}
        setAnecdotes={setAnecdotes}
      />
      <Footer />
    </Router>
  )
}

export default App;
