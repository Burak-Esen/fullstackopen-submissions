import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useField from '../../customHooks/inputs'
import { createABlog, getAllBlogs } from '../../reducers/blogReducer'
import { getAllUsers } from '../../reducers/userReducer'
import { makeNotification } from '../../reducers/notificationReducer'

const CreateBlog = () => {
  const user = useSelector(state=>state.user.user)
  const dispatch = useDispatch()
  const title = useField('text')
  const url = useField('text')
  const [showToggle, setShowToggle] = useState(false)
  

  const submitHandler = (event) =>{
    event.preventDefault()
    dispatch(createABlog({
      user:user.id,
      likes:0,
      title:event.target.title.value,
      url:event.target.url.value
    }))
    dispatch(makeNotification(`new blog created: ${event.target.title.value}`))
    title.refresh()
    url.refresh()
    setTimeout(()=>{
      dispatch(getAllUsers())
      dispatch(getAllBlogs())
    }, 500)
  }
  return (
    user ?
        showToggle ?
          <form onSubmit={submitHandler}>
            title:<input name="title" type={title.type} onChange={title.onChange} value={title.value}/><br/>
            url_:<input name="url" type={url.type} onChange={url.onChange} value={url.value}/><br/>
            <button>crerate</button><button type="button" onClick={()=>setShowToggle(false)}>cancel</button>
          </form>
        : <button onClick={()=>setShowToggle(true)}>Create New</button>
    : []
  )
}

export default CreateBlog
