import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [detailsIsHidden, setDetailsIsHidden] = useState(true)
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
  const titleStyle = {
    marginBottom:5,
    cursor:"pointer"
  }
  const detailDivStyle= {
    textAlign:'left'
  }

  return (
    <div className="column">
      <div style = {cardStyle} className="card">
        <div style = {textContainerStyle} >
          <h3 className="blogTitle" onClick={()=>setDetailsIsHidden(!detailsIsHidden)} style={titleStyle}>{blog.title}</h3>
          {detailsIsHidden ? [] :
          <div className="detailsContainer" style={detailDivStyle}>
            <span>author: {blog.author}</span><br />
            <span>Category: {blog.category}</span><br />
            <span>likes: {blog.likes}</span> <button>Like</button><br />
            <span>Url: {blog.url}</span>
          </div>}
          <a href={blog.url} rel="noopener noreferrer" target="_blank" >Go to Blog Page</a>
        </div>
      </div>
    </div>
  )
}
export default Blog
