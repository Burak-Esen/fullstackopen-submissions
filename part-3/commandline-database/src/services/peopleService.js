import axios from 'axios'
const baseUrl = '/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newPerson =>{
  return axios.post(baseUrl, newPerson)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const del = id =>{
  return axios.delete(`${baseUrl}/${id}`)
}
export default { getAll, create, update, del }