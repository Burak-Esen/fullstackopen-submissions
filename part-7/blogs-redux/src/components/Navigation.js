import React,{useState} from 'react'
import Login from './Login'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { makeNotification } from '../reducers/notificationReducer'
import { logout } from '../reducers/userReducer'

const Navigation = () => {
  const NavDivClasses = "py-2 bg-green-600 text-white"
  const linkClasses = "mx-2"
  const logoutBtnClasses = "mx-2 bg-red-300 rounded-md px-1 text-black"
  const loginTextClasses = "ml-4 font-extrabold"
  const [show,setShow]=useState(false)
  const user = useSelector(state=>state.user.user)
  const dispatch = useDispatch()
  const logoutHandler = () =>{
    dispatch(logout())
    dispatch(makeNotification('Logged Out'))
  }
  return (
    <div className={NavDivClasses}>
      <Link className={linkClasses} to="/">Main</Link>
      <Link className={linkClasses} to="/blogs">Blogs</Link>
      <Link className={linkClasses} to="/users">Users</Link>
      {user ?
        <div style={{'display':'inline-block'}}>
          <span className={loginTextClasses}>{user.name} logged in</span>
          <button className={logoutBtnClasses} onClick={logoutHandler}>Logout</button>
        </div>
        :show ?
            <Login show={show} setShow={setShow} />
          :
            <button className={linkClasses} onClick={()=>setShow(true)}>Login</button>
      }
    </div>
  )
}

export default Navigation
