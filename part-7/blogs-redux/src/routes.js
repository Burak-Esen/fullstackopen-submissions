import React, {useEffect} from 'react'
import { Route } from 'react-router-dom'
import Main from './components/Main'
import User from './components/users/User'
import Blog from './components/blogs/Blog'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from './reducers/userReducer'
import { getAllBlogs } from './reducers/blogReducer'

const BaseRouter = () => {
    const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllBlogs())
    dispatch(getAllUsers())
  }, [])
  
  const userIds = useSelector(state => state.user.users.map(u=>u.id))
  const blogIds = useSelector(state => state.blogs.map(b=>b.id))
  return (
    <div>
      <Route exact path="/" component={Main} />
      {userIds.map(id=><Route exact path={`/users/${id}`} component={User}  key={id}/>)}
      {blogIds.map(id=><Route exact path={`/blogs/${id}`} component={Blog}  key={id}/>)}
    </div>
  )
}

export default BaseRouter

