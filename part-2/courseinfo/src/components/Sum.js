import React from 'react'

const Sum = ({parts}) => {
  let sum=parts.reduce(( a, b) => {
    let res={}
    res.exercises=a.exercises+b.exercises
    return res
  }).exercises
  return (
    <p><b>
      Total of {sum} exercises
    </b></p>
  )
}

export default Sum