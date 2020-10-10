import React from 'react'
import Blog from './Blog'

const Blogs = (props) => {
  
  return (
    <div>
      {props.user!==null ?
      props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      ): []}
    </div>
  )
}

export default Blogs
