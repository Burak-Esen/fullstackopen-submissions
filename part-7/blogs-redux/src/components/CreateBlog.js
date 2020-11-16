import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useField from '../customHooks/inputs'
import { createABlog } from '../reducers/blogReducer'

const CreateBlog = () => {
  const user = useSelector(state=>state.user.user)
  const dispatch = useDispatch()
  const title = useField('text')
  const url = useField('text')

  const submitHandler = (event) =>{
    event.preventDefault()
    dispatch(createABlog({
      user:user.id,
      title:event.target.title.value,
      url:event.target.url.value
    }))
    title.refresh()
    url.refresh()
  }
  return (
    user ?
      <div>
        <form onSubmit={submitHandler}>
          title:<input name="title" type={title.type} onChange={title.onChange} value={title.value}/><br/>
          url_:<input name="url" type={url.type} onChange={url.onChange} value={url.value}/><br/>
          <button>crerate</button>
        </form>
      </div>
    : []
  )
}

export default CreateBlog
