import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const tabletitleClasses = "font-bold text-green-800"
  const linkClasses="hover:bg-blue-500 rounded-md px-1"
  const users = useSelector(state => state.user.users)
  return (
    <div className="ml-1">
      <h3 className="text-2xl">Users:</h3>
      <table className="table-fixed">
        <tbody>
          <tr>
            <td></td>
            <td className={tabletitleClasses}>blogs created</td>
          </tr>
          {users.map((u, i)=>
            <tr className={i%2===0 ? "w-1/4": "w-1/4 bg-blue-50" } key={u.id}>
              <td><Link className={linkClasses} to={`/users/${u.id}`}>{u.name}</Link></td>
              <td className="pl-2">{u.blogs.length}</td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default Users
