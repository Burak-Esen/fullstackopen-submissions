import blogService from '../services/blogService'
import userService from '../services/userService'

const blogReducer = (state=[], action) => {
  switch(action.type){
    case 'GET_ALL':
      state = action.data
      break
    case 'CREATE_BLOG':
      getAll()
      break
    default:
      return state
  }
  return state
}

export const createBlog = blogObj =>{
  return async dispatch => {
    const savedblog = await blogService.create(blogObj)
    console.log(savedblog)
    dispatch({
      type:'CREATE_BLOG',
      data:{
        
      }
    })
  }
}

export const getAll = () =>{
  return async dispatch => {
     dispatch({
      type:'GET_ALL',
      data:blogService.getAll()
    })
  }
}

export default blogReducer
