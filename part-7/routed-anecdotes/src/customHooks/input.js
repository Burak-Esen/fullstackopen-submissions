import { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const refresh = () => setValue('')
  
  return {
    type,
    value,
    onChange,
    refresh
  }
}

export default useField