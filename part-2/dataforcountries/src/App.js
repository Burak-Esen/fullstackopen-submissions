import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [ data, setData ] = useState([])
  const [ filterPhrase, setFilterPhrase ] = useState('')
  useEffect(()=>{
    async function promise(){
      const respond = await axios.get('https://restcountries.eu/rest/v2/all')
      setData(respond.data)
    }
    promise().catch((e)=>console.log('An error ocurred while fetch data'+ e.message))
  }, [])
  
  return (
    <div>
      <Filter filterPhrase={filterPhrase} setFilterPhrase={setFilterPhrase} />
      <Countries data={data} filterPhrase={filterPhrase}/>
    </div>
  )
}

export default App
