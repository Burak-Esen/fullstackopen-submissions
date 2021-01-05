import React,{ useState } from 'react'
import { useMutation } from '@apollo/client'
import { SET_BIRTH, ALL_AUTHORS } from '../queries'

const Authors = ({ show, authors, isAuth }) => {
  const [ setBirth ] = useMutation(SET_BIRTH, {
    refetchQueries: [ { query: ALL_AUTHORS }]
  })
  const [ name, SetName ] = useState('')
  const [ date, SetDate ] = useState('')
  if (!show) {
    return null
  }

  const setBirthHandler = e => {
    e.preventDefault()
    if(name!=='' && date!==''){
      setBirth({ variables: { name, birth:Number.parseInt(date) }})
      SetDate('')
    }
    
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>author name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    { isAuth
        ? <div>
            <h3>Set birth Year</h3>
            <form onSubmit={setBirthHandler}>
              name:<select name="authorName" onChange={({target})=>SetName(target.value)}>
                <option value="">select an author</option>
                {authors.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
              </select>
              <br/>
              born :<input value={date} onChange={({target})=>SetDate(target.value)} type="number"/>
              <br/>
              <button style={{margin:"5px"}} type="submit">Set Birth</button>
            </form>
          </div>
        : null
    }
    </div>
  )
}

export default Authors
