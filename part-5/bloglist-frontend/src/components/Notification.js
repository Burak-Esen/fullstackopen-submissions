import React from 'react'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={isError ? "error" : "notif"}>
      <p style={{marginTop:"5px", marginBottom:"5px"}}> {message} </p>
    </div>
  )
}

export default Notification