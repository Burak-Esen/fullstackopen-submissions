import React from 'react'

const Filter = (props) => {
  const filterHandlerOnCh = e => props.setFilterPhrase(e.target.value)
  return (
    <div>
      find countries <input onChange={filterHandlerOnCh} value={props.filterPhrase} />
    </div>
  )
}

export default Filter
