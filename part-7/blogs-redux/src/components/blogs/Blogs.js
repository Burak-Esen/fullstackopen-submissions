import React from 'react'
import { useSelector } from 'react-redux'
import CreateBlog from './CreateBlog'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogClasses = "border border-black rounded-lg pl-2 mb-2 mx-2 hover:bg-indigo-300"
  const blogs = useSelector(state=>state.blogs)
  return (
    <div>
      <h3 className="text-2xl ml-1">Blogs:</h3>
      <CreateBlog />
      <ul>
        {blogs.map(blog => 
          <li className={blogClasses} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Blogs
