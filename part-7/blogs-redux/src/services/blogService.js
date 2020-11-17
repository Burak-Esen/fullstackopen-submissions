import axios from 'axios'
const baseUrl = 'http://127.0.0.1:3005/blogs'

const create = async (blogObj, user) => { 
  return (await axios.post(baseUrl, blogObj)).data
}

const getAll = async () => {
  return (await axios.get(baseUrl)).data
}

const update = async (blogObj) => {
  return (await axios.put(`${baseUrl}/${blogObj.id}`, blogObj)).data
}

const deleteBlog = async (blogId) => {
  return await axios.delete(`${baseUrl}/${blogId}`)
}

// const getBlogsOfUser = async (userId) => {
//   return (await axios.get(`${baseUrl}?user=${userId}`)).data
// }

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  create,
  getAll,
  update,
  deleteBlog
  // getBlogsOfUser
}
