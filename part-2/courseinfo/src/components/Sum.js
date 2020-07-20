import React from 'react'

const Sum = ({parts}) => {
  // let sum=parts.reduce(( a, b) => {
  //   let res={}
  //   res.exercises=a.exercises+b.exercises
  //   return res
  // }).exercises
  let sum=parts.reduce((a,b) => {return {exercises:a.exercises+b.exercises}}).exercises
  return (
    <p><b>
      Total of {sum} exercises
    </b></p>
  )
}

export default Sum