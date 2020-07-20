import React, {useState} from 'react'
import Weather from "./Weather"

const FilteredCountries = (props) => {
  let [showFilter, setShowFilter ] = useState(new Array(props.countries.length).fill(false))
  const showHandler = e =>{
    let index=e.target.getAttribute('index')
    let temp=[].concat(showFilter)
    if(temp[index]===false){
      temp[index]=true
      e.target.innerHTML="hide"
    }else{
      temp[index]=false
      e.target.innerHTML="show"
    }
    setShowFilter(temp)
  }
  return (
    <div>
      {props.countries.map((country, i)=><div key={i}>
          <h2 style={{display:'inline'}}>{i+1}. {country.name}</h2>
          <button style={{display:'inline-block'}} onClick={showHandler} index={Number(i)}>show</button>
          <div style={{display:showFilter[i] ? "initial" : "none"}}>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <br/>
            <h3 style={{marginLeft:7}}>languages</h3>
            <ul>
              {country.languages.map(lang=><li key={lang.name}>{lang.name}</li>)}
            </ul>
            <img height={150} src={country.flag} alt={country.name + ' flag'}/>
            <Weather city={country.capital} />
          </div>
        </div>
      )}
    </div>
  )
}

export default FilteredCountries
