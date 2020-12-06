import React from 'react'
import { useSelector } from 'react-redux'
import CreateBlog from './CreateBlog'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector(state=>state.blogs)
  const style = {
    'border':'1px solid black',
    'border-radius':'0.5rem',
    'paddingLeft':'0.5rem',
    'marginBottom':'0.5rem',
    'listStyle':'none',
    'marginLeft':'-2rem'
  }
  return (
    <div>
      <CreateBlog />
      <ul>
        {blogs.map(blog => 
          <li style={style}key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Blogs
