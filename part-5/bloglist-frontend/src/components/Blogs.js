import React, { useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = (props) => {

  const sortLikesHandler = () => {
    props.setBlogs(prev => prev.sort((a, b) => b.likes - a.likes).concat([]))
  }

  useEffect(() => {
    if (props.user !== null) {
      blogService.getAll()
        .then(blogs => props.setBlogs(blogs))
    }
  }, [props.user])

  return (
    props.user !== null ?
      <div className="row">
        <button style={{ marginLeft: '0.4rem' }} onClick={sortLikesHandler}>Sort by likes</button><br />
        {props.blogs.map(blog => <Blog getTokenFromWindow={props.getTokenFromWindow}
          key={blog.id}
          blog={blog}
          setBlogs={props.setBlogs}
          notificationHandler={props.notificationHandler}
        />)}
      </div>
      : []
  )
}

export default Blogs
