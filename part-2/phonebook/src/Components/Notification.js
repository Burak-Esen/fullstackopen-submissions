import React from 'react'

const Notification = (props) => {

  if(props.notificationMessage===null){
    return null
  }
  return (
    <div class="notification">
      {props.notificationMessage}
    </div>
  )
}

export default Notification
