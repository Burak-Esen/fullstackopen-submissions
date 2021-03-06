import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog, token) => {
  const config = {
    headers: { Authorization: 'bearer ' + token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (updateBlog, token) => {
  const config = {
    headers: { Authorization: 'bearer ' + token }
  }
  const response = await axios.put(`${baseUrl}/${updateBlog.id}`, updateBlog, config)
  return response.data
}

const deleteBlog = async (id, token) => {
  const config = {
    headers: { Authorization: 'bearer ' + token }
  }
  return await axios.delete(`${baseUrl}/${id}`,config)
}

export default { getAll, create, update, deleteBlog }