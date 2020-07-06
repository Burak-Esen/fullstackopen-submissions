import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = (probs) =>{
  return (
  <h1>{probs.course.name}</h1>
  )
}

const Content = (probs) =>{
  return (
    <div>
      {probs.parts.map(partObj => <Part part={partObj} />)}
    </div>
  )
}

const Total = (probs) =>{
  let total=0;
  probs.parts.map(obj => total+=obj.exercises)
  return <p>Number of exercises {total}</p>
}

// second degree components

const Part = (probs) =>{
  return <p>{probs.part.name} {probs.part.exercises}</p>
}

const App = () =>{
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
