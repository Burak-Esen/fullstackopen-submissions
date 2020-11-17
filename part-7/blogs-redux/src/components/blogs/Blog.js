import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { likeBlog, deleteBlog, getAllBlogs } from '../../reducers/blogReducer'
import { getAllUsers } from '../../reducers/userReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state=>state.user.user)
  const blogId = Number.parseInt(history.location.pathname.substring(7))
  const blog = useSelector(state=>state.blogs.find(b=>b.id===blogId))
  const blogOwner = useSelector(state=>state.user.users.find(u=>u.id===blog.user))
  const deleteHandler = () => {
    dispatch(deleteBlog(blog))
    history.replace('/')
    setTimeout(()=>{
      dispatch(getAllUsers())
      dispatch(getAllBlogs())
    }, 500)
  }
  return (
    <div>
      <h3>{blog.title}</h3>
      <span><a href={blog.url} rel="noreferrer" target="_blank">{blog.url}</a></span><br/>
      <span>Likes: {blog.likes}</span><button type="button" onClick={()=>dispatch(likeBlog(blog))}>like</button><br/>
      <span>Added by {blogOwner?blogOwner.name:""}</span><br/>
      { user && blogOwner && user.id===blogOwner.id ?
        <button onClick={deleteHandler} style={{backgroundColor:"red", color:"white"}}>Delete</button>
        : []
      }
    </div>
  )
}
export default Blog
