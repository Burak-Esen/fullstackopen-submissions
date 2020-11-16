import React, { useEffect } from 'react'
import { getAllUsers } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.user.users)
  useEffect(()=>{
    dispatch(getAllUsers())
  }, [])
  return (
    <div>
      <h3>Users</h3>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><b>blogs created</b></td>
          </tr>
          {users.map(u=><tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.blogs.length}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Users
