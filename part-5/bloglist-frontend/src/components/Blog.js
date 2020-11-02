import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, getTokenFromWindow, setBlogs }) => {
  const [detailsIsHidden, setDetailsIsHidden] = useState(true)
  // eslint-disable-next-line no-unused-vars
  const [likeBtnIsDisable, setLikeBtnIsDisable] = useState(false)
  const cardStyle = {
    backgroundImage: `url(${blog.previewUrl})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  }
  const textContainerStyle = {
    textShadow: '2px 2px 4px #FFFFFF, -2px -2px 4px #FFFFFF',
    position: 'absolute',
    //paddingBottom:'1rem',
    paddingTop: 0,
    bottom: 0,
    flex: 0,
    width: '100%'
  }
  const titleStyle = {
    marginBottom: 5,
    cursor: 'pointer'
  }
  const detailDivStyle = {
    textAlign: 'left'
  }

  const likeHandler = e => {
    e.preventDefault()
    blogService.update({ ...blog, likes: blog.likes + 1 }, getTokenFromWindow())
      .then(
        setBlogs(blogs => {
          blogs.find(blogObj => blogObj.id === blog.id).likes = blog.likes + 1
          //setLikeBtnIsDisable(true)
          return blogs.concat([])
        })
      )
  }

  const deleteHandler = e => {
    e.preventDefault()
    if (window.confirm(`Blog: ${blog.title} will be erased parmanently. Is it OK?`)) {
      blogService.deleteBlog(blog.id, getTokenFromWindow())
      setBlogs(prev => prev.filter(obj => obj.id !== blog.id))
    }
  }

  return (
    <div className="column">
      <div style={cardStyle} className="card">
        <div style={textContainerStyle} >
          <h3 className="blogTitle" onClick={() => setDetailsIsHidden(!detailsIsHidden)} style={titleStyle}>{blog.title}</h3>
          <span><b>by:</b> {blog.author}</span><br />
          {detailsIsHidden ? [] :
            <div className="detailsContainer" style={detailDivStyle}>
              <span>Category: {blog.category}</span><br />
              <span>likes: {blog.likes}</span> <button onClick={likeHandler} disabled={likeBtnIsDisable}>Like</button><br />
              <span>Url: {blog.url}</span><br />
              <span style={{
                cursor: 'pointer',
                backgroundColor: 'red',
                paddingLeft: '2px',
                paddingRight: '2px',
                textShadow: 'none',
                color: 'white',
                fontWeight: 400
              }} onClick={deleteHandler}>Delete?</span>
            </div>}
          <a href={blog.url} rel="noopener noreferrer" target="_blank" >Go to Blog Page</a>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  getTokenFromWindow: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired
}
export default Blog
