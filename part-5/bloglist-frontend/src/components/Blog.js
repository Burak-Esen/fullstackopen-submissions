import React from 'react'
const Blog = ({ blog }) => {
  const cardStyle = { 
    backgroundImage:`url(${blog.previewUrl})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection:'column',
  }
  const textContainerStyle = {
    textShadow: '2px 2px 4px #FFFFFF, -2px -2px 4px #FFFFFF',
    position:'absolute',
    //paddingBottom:'1rem',
    paddingTop:0,
    bottom:0,
    flex:0,
    width:'100%'
  }
  return (
    <div className="column">
      <div style = {cardStyle} className="card">
        <div style = {textContainerStyle} >
          <h3>{blog.title}</h3>
          <p>{blog.author}</p>
          <a href={blog.url} rel="noopener noreferrer" target="_blank" >Go to</a>
        </div>
      </div>
    </div>
  )
}
export default Blog
