import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { likeBlog, deleteBlog, getAllBlogs, commentABlog } from '../../reducers/blogReducer'
import { getAllUsers } from '../../reducers/userReducer'
import useField from '../../customHooks/inputs'
import { makeNotification } from '../../reducers/notificationReducer'

const Blog = () => {
  const mainDivClasses= "ml-1"
  const titleClasses= "text-2xl"
  const likeBtnClasses = "ml-2 bg-green-400 rounded-md px-1"
  const commentInputClasses = "pl-1 rounded-md w-96 border border-green-400"
  const commentClasses = "ml-2"
  const deleteBtnClasses = " bg-red-500 text-white rounded-md px-1"
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
    dispatch(makeNotification(`${blog.title} was deleted.`))
  }
  const commentHandler = event => {
    event.preventDefault()
    blog.comments = blog.comments.concat(event.target.comment.value)
    dispatch(commentABlog(blog))
    comment.refresh()
  }

  return (
    <div className={mainDivClasses}>
      <h3 className={titleClasses}>{blog.title}</h3>
      <span>visit → <a href={blog.url} rel="noreferrer" target="_blank">{blog.url}</a></span><br/>
      <span>Likes: {blog.likes}</span><button className={likeBtnClasses} type="button" onClick={()=>dispatch(likeBlog(blog))}>like</button><br/>
      <span>Added by {blogOwner?blogOwner.name:""}</span><br/>
      { user && blogOwner && user.id===blogOwner.id ?
        <button onClick={deleteHandler} className={deleteBtnClasses}>Delete this blog</button>
        : []
      }
      <h3>Comments</h3>
      <form onSubmit={commentHandler}>
        <input className={commentInputClasses} name="comment"
          type={comment.type}
          onChange={comment.onChange}
          value={comment.value}
        /><button className={likeBtnClasses} type="submit">Add Comment</button>
      </form>
      {<ul>
        {blog.comments.map((com, i)=><li className={commentClasses} key={i}>{com}</li>)}
      </ul>}
    </div>
  )
}
export default Blog
