import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAllAnecdotes = async () =>{
  const all = await axios.get(baseUrl)
  return all.data
}
