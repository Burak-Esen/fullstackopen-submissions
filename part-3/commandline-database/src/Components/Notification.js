import React from 'react'

const Notification = (props) => {

  if(props.notificationMessage===null){
    return null
  }
  return (
    <div className={props.isError ? "notification notification--error" : "notification"}>
      {props.notificationMessage}
    </div>
  )
}

export default Notification
