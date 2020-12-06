import React from 'react'
import useField from '../customHooks/inputs'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../reducers/userReducer'
import { makeNotification } from '../reducers/notificationReducer'

const Login = (props) => {
  const cancelBtnClasses="ml-12 -mt-9 inline-flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
  const username = useField('text')
  const secret = useField('password')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)

  const loginHandler = event => {
    event.preventDefault()
    dispatch(login({ username:username.value, secret:secret.value }))
    username.refresh()
    secret.refresh()
  }
  const logoutHandler = () =>{
    dispatch(logout())
    dispatch(makeNotification('Logged Out'))
  }
  return (
    <div>
      {user ? 
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      :
        <div className="grid sm:grid-cols-2 md:grid-cols-3">
          <div className="ml-8">
            <form onSubmit={loginHandler}>
              <div className="shadow bg-gray-50 rounded-md">
                <div className="px-4 py-5 space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username:
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input type={username.type}
                          name="username"
                          onChange={username.onChange}
                          value={username.value}
                          autoComplete="username"
                          id="username"
                          className="flex-1 block w-full rounded-md border-gray-400 sm:text-sm text-gray-900 border-2 pl-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="secret" className="block text-sm font-medium text-gray-700">
                        Secret:
                      </label>
                      <div className="mt-1">
                        <input type={secret.type}
                          id="secret"
                          name="secret"
                          onChange={secret.onChange}
                          value={secret.value}
                          autoComplete="current-password"
                          className="shadow-sm mt-1 block w-full border-2 sm:text-sm border-gray-400 text-gray-900 rounded-md pl-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 text-right sm:px-6">
                  <button type="submit" className="inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Login
                  </button>
                  <button className={cancelBtnClasses} onClick={()=>props.setShow(false)}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  )
}

export default Login
