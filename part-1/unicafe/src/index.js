import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Buttons = (probs) =>{
  return (
    <div>
      <button onClick={probs.handlerG}>good</button>
      <button onClick={probs.handlerN}>neutral</button>
      <button onClick={probs.handlerB}>bad</button>
    </div>
  )
}

const Statistics = (probs) =>{
  let total=probs.good+probs.neutral+probs.bad
  let score=probs.good-probs.bad
  if(total===0){
    return <p>No feedback given</p>
  }
  return(
    <table>
      <tbody>
        <Statistic text="good" value ={probs.good} />
        <Statistic text="neutral" value ={probs.neutral} />
        <Statistic text="bad" value ={probs.bad} />
        <Statistic text="all" value ={total} />
        <Statistic text="average" value ={score/total} />
        <Statistic text="positive" value ={probs.good*100/total +" %"} />
      </tbody>
    </table>
  )
}
const Statistic = (probs) =>{
  return (
    <tr>
      <td>{probs.text}</td>
      <td>{probs.value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handlerGood= () =>{setGood(good+1);}
  const handlerNeutral= () =>{setNeutral(neutral+1);}
  const handlerBad= () =>{setBad(bad+1);}
  return (
    <div>
      <h2>give feedback</h2>
      <Buttons handlerG={handlerGood} handlerN={handlerNeutral} handlerB={handlerBad}/>
      <h2>statistic</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))