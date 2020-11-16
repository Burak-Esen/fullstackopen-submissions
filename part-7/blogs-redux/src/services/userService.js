import axios from 'axios'
const baseUrl = 'http://127.0.0.1:3005/users'

const create = async (userObj) => {
  return await axios.post(baseUrl, userObj)
}

const getAll = async () => {
  return (await axios.get(baseUrl)).data.map(u => {
    delete u.secret
    return u
  })
}

const update = async (userObj) => {
  return await axios.put(baseUrl, userObj)
}

const login = async (loginObj) => {
  const users = (await axios.get(baseUrl)).data
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
