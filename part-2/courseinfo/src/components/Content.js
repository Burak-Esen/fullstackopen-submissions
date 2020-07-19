import React from 'react'
import Part from "./Part"
import Sum from "./Sum"

const Content = ({content}) => {
  return (
    <div>
      {content.map((part)=><Part key={part.id} part={part} />)}
      {<Sum parts={content}/>}
    </div>
  )
}

export default Content
