import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
  const [weatherDes, setWeatherDes]=useState([])
  const [temperature, setTemperature]=useState()
  const [iconURLs, setIconURLs]=useState([])
  const [windSpeed, setWindSpeed] = useState()
  const [windDir, setWindDir]=useState('')
  const api_key = process.env.REACT_APP_API_KEY
  const city=props.city.includes(" ") ? props.city.replace(" ", "%20") : props.city;
  useEffect(()=>{
    async function promise(){
      const respond = await axios.get('http://api.weatherstack.com/current?access_key='+api_key+'&query='+ city)
      setWeatherDes(respond.data.current.weather_descriptions)
      setTemperature(respond.data.current.temperature)
      setIconURLs(respond.data.current.weather_icons)
      setWindDir(respond.data.current.wind_dir)
      setWindSpeed(respond.data.current.wind_speed)
    }
    promise().catch((e)=>console.log('An error ocurred while fetch weather data'+ e.message))
  }, [])
  return (
    <div>
      <h3>Weather in {props.city}</h3>
      <p>{weatherDes.map((des,i)=><span key={i}>{des}</span>)}</p>
      <p><b>Temperature: </b>{temperature} Celcius</p>
      {iconURLs.map((url,i)=><img key={i} src={url} alt={weatherDes.join(" ") + ' weather icons'}/>)}
      <p><b>Wind: </b>{windSpeed} mph direction {windDir}</p>
    </div>
  )
}

export default Weather
