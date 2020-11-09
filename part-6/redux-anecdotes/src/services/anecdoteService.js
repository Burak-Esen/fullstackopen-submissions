import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAllAnecdotes = async () =>{
  const all = await axios.get(baseUrl)
  return all.data
}

export const createNewAnecdote = async (content) => {
  const object = { content:content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

export const updateAnecdote = async (obj) => {
  const updatedAnecdote = await axios.put(`${baseUrl}/${obj.id}`, obj)
  return updatedAnecdote.data
}
