import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useField from '../../customHooks/inputs'
import { createABlog, getAllBlogs } from '../../reducers/blogReducer'
import { getAllUsers } from '../../reducers/userReducer'
import { makeNotification } from '../../reducers/notificationReducer'

const CreateBlog = () => {
  const formClassses="ml-1 grid md:grid-cols-2 my-2"
  const newBtnClasses="ml-1 bg-indigo-500 hover:bg-indigo-600 rounded-md px-1 mb-1 text-white"
  const cancelBtnClasses="ml-4 inline-flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600"
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
      url:event.target.url.value,
      comments:[]
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
          <form className={formClassses} onSubmit={submitHandler}>
            <div className="shadow bg-gray-50 rounded-md">
              <div className="px-4 py-5 space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title:
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input type={title.type}
                        name="title"
                        onChange={title.onChange}
                        value={title.value}
                        id="title"
                        className="flex-1 block w-full rounded-md border-gray-400 sm:text-sm text-gray-900 border-2 pl-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                      Url:
                    </label>
                    <div className="mt-1">
                      <input type={url.type}
                        id="url"
                        name="url"
                        onChange={url.onChange}
                        value={url.value}
                        className="shadow-sm mt-1 block w-full border-2 sm:text-sm border-gray-400 text-gray-900 rounded-md pl-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 text-right sm:px-6">
                <button type="submit" className="inline-flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Create
                </button>
                <button type="button" className={cancelBtnClasses} onClick={()=>setShowToggle(false)}>Cancel</button>
              </div>
            </div>
          </form>
        : <button className={newBtnClasses} onClick={()=>setShowToggle(true)}>Create New</button>
    : []
  )
}

export default CreateBlog
