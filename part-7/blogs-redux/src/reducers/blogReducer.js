import blogService from '../services/blogService'
import userService from '../services/userService'

const blogReducer = (state=[], action) => {
  switch(action.type){
    case 'GET_ALL':
      state = action.data
      console.log(state)
      break
    case 'CREATE_BLOG':
      break
    default:
      return state
  }
  return state
}

export const createABlog = blogObj =>{
  return async dispatch => {
    const savedblog = await blogService.create(blogObj)
    const user = await userService.findById(savedblog.user)
    user.blogs = user.blogs.concat(savedblog.id)
    await userService.update(user, user.id)
    dispatch(getAllBlogs())
    dispatch({
      type:'CREATE_BLOG'
    })
  }
}

export const getAllBlogs = () =>{
  return async dispatch => {
    const blogs =  await blogService.getAll()
     dispatch({
      type:'GET_ALL',
      data:blogs
    })
  }
}

export default blogReducer
