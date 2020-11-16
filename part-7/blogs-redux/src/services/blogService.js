import axios from 'axios'
// import userService from './userService'
const baseUrl = 'http://127.0.0.1:3005/blogs'

const create = async (blogObj, user) => { 
  return await axios.post(baseUrl, blogObj)
  //console.log(asd)
  //await userService.update({...user, blogs:user.blogs.concat})
}

const getAll = async () => {
  return (await axios.get(baseUrl)).data
}

const update = async (blogObj) => {
  return await axios.put(baseUrl, blogObj)
}

const login = async (loginObj) => {
  const users = await getAll()
  const user = users.find(u => u.username === loginObj.username)
  if(user){
    if(user.secret===loginObj.secret){
      return user
    }
  }
  return null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  create,
  getAll,
  update,
  login
}
