import React, { useEffect, useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogs, setBlogs] = useState([])
  const {user} = props
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ) 
  }, [user])
  const createBlogaHandler = e => {
    e.preventDefault()
    const newBlog={
      title:title,
      url:url,
      author:author
    }
    blogService.create(newBlog, props.getTokenFromWindow())
      .then(savedBlog=>{
        setBlogs(blogs=>blogs.concat(savedBlog))
        props.notificationHandler('"'+title+'" added.', false)
        setTitle('')
        setUrl('')
        setAuthor('')
      })
      .catch(e=>props.notificationHandler(e.response.data['error'], true))
  }
  return (
    props.user!==null ? 
    <>
      <form onSubmit={createBlogaHandler}><br />
        title__: <input value={title} onChange={({target})=>setTitle(target.value)} /><br />
        author: <input value={author} onChange={({target})=>setAuthor(target.value)} /><br />
        url__ : <input value={url} onChange={({target})=>setUrl(target.value)} /><br />
        <input type="submit" /><br /><br />
      </form>
      <div className="row">
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    </> : [] 
  )
}

export default Blogs
