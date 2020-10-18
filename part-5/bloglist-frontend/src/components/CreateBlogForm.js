import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlogaHandler = e => {
    e.preventDefault()
    const newBlog = {
      title: title,
      url: url,
      author: author
    }
    blogService.create(newBlog, props.getTokenFromWindow())
      .then(savedBlog => {
        props.setBlogs(blogs => blogs.concat(savedBlog))
        props.notificationHandler('"' + title + '" added.', false)
        setTitle('')
        setUrl('')
        setAuthor('')
      })
      .catch(e => props.notificationHandler(e.response.data['error'] || e.message, true))
  }
  return (
    <form data-testid="blogForm" onSubmit={createBlogaHandler}><br />
      title__: <input data-testid="testTitle" id="title" value={title} onChange={({ target }) => setTitle(target.value)} /><br />
      author: <input data-testid="testAuthor" id="author" value={author} onChange={({ target }) => setAuthor(target.value)} /><br />
      url__ : <input data-testid="testUrl" id="url" value={url} onChange={({ target }) => setUrl(target.value)} /><br />
      <input type="submit" value="Add Blog" />
    </form>
  )
}

export default CreateBlogForm
