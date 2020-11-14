import React from 'react'
import { Switch, Route } from "react-router-dom"
import CreateNew from './components/CreateNew'
import About from './components/About'
import AnecdotesList from './components/AnecdotesList'
import Anecdote from './components/Anecdote'

const BaseRoter = (props) => (
  <Switch>
    <Route exact path='/' component={AnecdotesList}>
      <AnecdotesList anecdotes={props.anecdotes} setAnecdotes={props.setAnecdotes} />
    </Route>

    <Route exact path='/anecdotes/:id' component={Anecdote}>
      <Anecdote anecdotes={props.anecdotes} />
    </Route>

    <Route exact path='/create' component={CreateNew}>
      <CreateNew anecdotes={props.anecdotes}
        setAnecdotes={props.setAnecdotes}
        makeNotification={props.makeNotification}
      />
    </Route>

    <Route exact path='/about' component={About}>
      <About />
    </Route>
  </Switch>
)

export default BaseRoter