import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

const User = () => {
  const history = useHistory()
  const userId=Number.parseInt((history.location.pathname).substring(7))
  const user = useSelector(state=>state.user.users.find(u=>u.id===userId))
  const blogs = useSelector(state=>state.blogs.filter(b=>b.user===user.id))
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {blogs.map(b=>
          <li key={b.id}>
            <Link to={`/blogs/${b.id}`}>{b.title}</Link>
          </li>)}
      </ul>
    </div>
  )
}

export default User
