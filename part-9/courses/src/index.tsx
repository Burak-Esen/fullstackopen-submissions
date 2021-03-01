import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

interface Course {
  name:string
}

interface CoursePart {
  name:string
  exerciseCount:number
}

interface CourseList {
  courseList:CoursePart[]
}

const Header:React.FC<Course> = (props) => {
  return <h1>{props.name}</h1>;
}

const Content: React.FC<CourseList> = (props) => {
  return <div>
    {
      props.courseList.map((part, i) => (
        <p key={i}>{part.name} {part.exerciseCount}</p>
      ))
    }
  </div>
}

const Total: React.FC<CourseList> = (props) => {
  return <p>Number of exercises{' '}
  {props.courseList.reduce((a, b) => a + b.exerciseCount, 0)}
  </p>
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseList={courseParts} />
      <Total courseList={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));



// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
