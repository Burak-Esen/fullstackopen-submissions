import React from 'react'
import { Switch, Route } from "react-router-dom"
import CreateNew from './components/CreateNew'
import About from './components/About'
import AnecdotesList from './components/AnecdotesList'

const BaseRoter = (props) => (
  <Switch>
    <Route exact path='/' component={AnecdotesList}>
      <AnecdotesList anecdotes={props.anecdotes} setAnecotes={props.setAnecotes} />
    </Route>
    <Route exact path='/create' component={CreateNew}>
      <CreateNew setAnecotes={props.setAnecotes} />
    </Route>
    <Route exact path='/about' component={About}>
      <About />
    </Route>
  </Switch>
)

export default BaseRoter