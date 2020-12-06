import blogService from '../services/blogService'
import userService from '../services/userService'

const blogReducer = (state=[], action) => {
  switch(action.type){
    case 'GET_ALL_BLOGS':
      state = action.data
      break
    case 'CREATE_BLOG':
      break
    case 'DELETE_BLOG':
      break
    case 'LIKE_A_BLOG':
      state=state.filter(b=>b.id!==action.data.id)
      state=state.concat(action.data)
      break
    case 'COMMENT_A_BLOG':
      state=state.filter(b=>b.id!==action.data.id)
      state=state.concat(action.data)
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
    dispatch({
      type:'CREATE_BLOG'
    })
  }
}

export const getAllBlogs = () =>{
  return async dispatch => {
    const blogs =  await blogService.getAll()
     dispatch({
      type:'GET_ALL_BLOGS',
      data:blogs
    })
  }
}

export const likeBlog = blogObj => {
  return async dispatch => {
    blogObj.likes++
    const savedBlog = await blogService.update(blogObj)
    dispatch({
      type:'LIKE_A_BLOG',
      data:savedBlog
    })
  }
}

export const commentABlog = blogObj => {
  return async dispatch => {
    const savedBlog = await blogService.update(blogObj)
    dispatch({
      type:'COMMENT_A_BLOG',
      data:savedBlog
    })
  }
}

export const deleteBlog = (blogObj) => {
  return async dispatch => {
    await blogService.deleteBlog(blogObj.id)
    const user = await userService.findById(blogObj.user)
    user.blogs = user.blogs.filter(i => i!==blogObj.id)
    await userService.update(user, user.id)
    dispatch({
      type:'DELETE_BLOG'
    })
  }
}

export default blogReducer
