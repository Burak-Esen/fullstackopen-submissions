import React from 'react'

const Notification = (props) => {
  return props.notification==='' ? [] : <p>{props.notification}</p>
}

export default Notification
