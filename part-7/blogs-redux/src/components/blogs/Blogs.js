import React from 'react'
import { useSelector } from 'react-redux'
import CreateBlog from './CreateBlog'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector(state=>state.blogs)
  return (
    <div>
      <CreateBlog />
      <ul>
        {blogs.map(blog => 
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Blogs
