import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateBlog from './CreateBlog'
import { getAllBlogs } from '../reducers/blogReducer'

const Blogs = () => {
  const blogs = useSelector(state=>state.blogs)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllBlogs())
  }, [])
  return (
    <div>
      <CreateBlog />
      <ul>
        {blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default Blogs
