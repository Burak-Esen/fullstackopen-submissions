import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

interface Course {
  name:string
}

interface CourseList {
  courseList:CoursePart[]
}

const Header:React.FC<Course> = (props) => {
  return <h1>{props.name}</h1>;
};

const Part: React.FC<{part:CoursePart}> = (props) => {
  //↑ type {part:CoursePart} or CoursePart directly
  //↑ when use second one: props is directly CoursePart object
  //↑ so component <Part {...part} key={i} />
  /**
  * Helper function for exhaustive type checking
  */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch (props.part.name) {
    case 'Fundamentals':
      return <div>
        <h3>{props.part.name}</h3>
        <p>description: {props.part.description}</p>
        <p>exercise count: {props.part.exerciseCount}</p>
      </div>
    case 'Using props to pass data':
      return <div>
        <h3>{props.part.name}</h3>
        <p>group project count: {props.part.groupProjectCount}</p>
        <p>exercise count: {props.part.exerciseCount}</p>
      </div>
    case 'Deeper type usage':
      return <div>
        <h3>{props.part.name}</h3>
        <p>description: {props.part.description}</p>
        <p>submission link: {props.part.exerciseSubmissionLink}</p>
        <p>exercise count: {props.part.exerciseCount}</p>
      </div>
    case 'Backend development':
      return <div>
      <h3>{props.part.name}</h3>
        <p>description: {props.part.description}</p>
        <p>exercise count: {props.part.exerciseCount}</p>
      </div>
    default:
      return assertNever(props.part)
  }
};

const Content: React.FC<CourseList> = (props) => {
  return <div>
    {
      props.courseList.map((part, i) => (
        <Part part={part} key={i} />
      ))
    }
  </div>
};

const Total: React.FC<CourseList> = (props) => {
  return <p>Number of exercises{' '}
  {props.courseList.reduce((a, b) => a + b.exerciseCount, 0)}
  </p>
};

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface BaseCoursePartWithDesc extends CoursePartBase {
  description: string;
  groupProjectCount? : number;
  exerciseSubmissionLink?: string;
}


interface CoursePartOne extends BaseCoursePartWithDesc {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends BaseCoursePartWithDesc {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends BaseCoursePartWithDesc {
  name: "Backend development";
  requirements?: string[];
  type?:string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour ;





const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
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
