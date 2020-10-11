import React, { useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = (props) => {
  useEffect(() => {
    blogService.getAll().then(blogs =>
      props.setBlogs( blogs )
    ) 
  }, [])
  
  return (
    props.user!==null ? 
    <div className="row">
      {props.blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
    : [] 
  )
}

export default Blogs
