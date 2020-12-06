import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notifDivClasses = "border-4 border-green-600 rounded-md pl-2"
  const message = useSelector(state => state.notification)
  return (
    message ?
      <div className={notifDivClasses}>
        {message}
      </div>
    :
      []
  )
}

export default Notification
