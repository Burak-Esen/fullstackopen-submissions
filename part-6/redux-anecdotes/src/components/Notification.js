import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    props.message !== "" ?
      <div style={style}>
        {props.message}
      </div>
    : []
  )
}

const mapStateToProps = state => {
  return {
    message:state.notification.message
  }
}
export default connect(mapStateToProps)(Notification)