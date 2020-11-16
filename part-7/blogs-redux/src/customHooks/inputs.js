import { useState } from 'react'

const useField = (type) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  const refresh = () => setValue('')
  return {
    value,
    onChange,
    type,
    refresh
  }
}

export default useField
