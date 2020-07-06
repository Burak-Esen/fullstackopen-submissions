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

const Statistic = (probs) =>{
  return(
    <div>
      <p>good {probs.good}</p>
      <p>neutral {probs.neutral}</p>
      <p>bad {probs.bad}</p>
    </div>
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
      <Statistic good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))