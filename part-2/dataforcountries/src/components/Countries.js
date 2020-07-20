import React from 'react'

const Countries = (props) => {
  let countryNamesWithFilter =props.data.filter(country=>country.name.toLowerCase().includes(props.filterPhrase))
  let resultOfNames = countryNamesWithFilter.length>10 ? "Too many matches, specify another filter" 
    : countryNamesWithFilter.map((country, i)=>{
      return <div key={i}>
        <h2>{i+1}. {country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <br/>
        <h3 style={{marginLeft:7}}>languages</h3>
        <ul>
          {country.languages.map(lang=><li key={lang.name}>{lang.name}</li>)}
        </ul>
        <img height={150} src={country.flag} alt={country.name + ' flag'}/>
      </div>
  })
  return (
    <div>
      {resultOfNames}
    </div>
  )
}

export default Countries
