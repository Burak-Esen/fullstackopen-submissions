import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { likeBlog, deleteBlog, getAllBlogs, commentABlog } from '../../reducers/blogReducer'
import { getAllUsers } from '../../reducers/userReducer'
import useField from '../../customHooks/inputs'

const Blog = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state=>state.user.user)
  const blogId = Number.parseInt(history.location.pathname.substring(7))
  const blog = useSelector(state=>state.blogs.find(b=>b.id===blogId))
  const blogOwner = useSelector(state=>state.user.users.find(u=>u.id===blog.user))
  const comment = useField('text')
  const deleteHandler = () => {
    dispatch(deleteBlog(blog))
    history.replace('/blogs')
    setTimeout(()=>{
      dispatch(getAllUsers())
      dispatch(getAllBlogs())
    }, 500)
  }
  const commentHandler = event => {
    event.preventDefault()
    blog.comments = blog.comments.concat(event.target.comment.value)
    dispatch(commentABlog(blog))
    comment.refresh()
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
      <h3>Comments</h3>
      <form onSubmit={commentHandler}>
        <input name="comment"
          type={comment.type}
          onChange={comment.onChange}
          value={comment.value}
        /><button type="submit">Add Comment</button>
      </form>
      {<ul>
        {blog.comments.map((com, i)=><li key={i}>{com}</li>)}
      </ul>}
    </div>
  )
}
export default Blog
