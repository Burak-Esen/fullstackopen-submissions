import React from 'react'
const Blog = ({ blog }) => (
  <div className="column">
    <div className="card">
        <h3>{blog.title}</h3>
        <p>{blog.author}</p>
    <a href={blog.url} rel="noopener noreferrer" target="_blank" >Go to</a>
    </div>
  </div>
)

export default Blog
