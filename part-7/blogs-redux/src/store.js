import { createStore, combineReducers, applyMiddleware } from 'redux'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  user:userReducer,
  blogs:blogReducer,
  notification:notificationReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store