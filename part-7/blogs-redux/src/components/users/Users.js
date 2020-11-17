import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.user.users)
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
            <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
            <td>{u.blogs.length}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Users
