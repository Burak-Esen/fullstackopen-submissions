import React from 'react'
import FilteredCountries from './FilteredCountries'

const Countries = (props) => {
  let countryNamesWithFilter =props.data.filter(country=>country.name.toLowerCase().includes(props.filterPhrase))
  let resultOfSpecificFilter = countryNamesWithFilter.length>10 ? false : countryNamesWithFilter
  
  return (
    <div>
      {resultOfSpecificFilter ? <FilteredCountries countries={resultOfSpecificFilter} /> 
        : "Too many matches, specify another filter"}
    </div>
  )
}

export default Countries
