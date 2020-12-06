import React,{useState} from 'react'
import Login from './Login'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { makeNotification } from '../reducers/notificationReducer'
import { logout } from '../reducers/userReducer'

const Navigation = () => {
  const [show,setShow]=useState(false)
  const user = useSelector(state=>state.user.user)
  const dispatch = useDispatch()
  const logoutHandler = () =>{
    dispatch(logout())
    dispatch(makeNotification('Logged Out'))
  }
  return (
    <div style={{"background":"grey"}}>
      <Link to="/">Main</Link>
      <Link to="/blogs">Blogs</Link>
      <Link to="/users">Users</Link>
      {user ?
        <div style={{'display':'inline-block'}}>
          <span>{user.name} logged in</span>
          <button onClick={logoutHandler}>Logout</button>
        </div>
        :show ?
            <>
              <Login />
              <button onClick={()=>setShow(false)}>Cancel</button>
            </>
          :
            <button onClick={()=>setShow(true)}>Login</button>
      }
    </div>
  )
}

export default Navigation
