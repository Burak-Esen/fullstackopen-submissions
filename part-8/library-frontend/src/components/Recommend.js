import React,{ useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommend = ({ show, me }) => {
  
  const [getFilteredBooks, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    getFilteredBooks({ variables:{ genre:me.favoriteGenre}})
  }, [getFilteredBooks, me ])
  
  if(!show){
    return null
  }
  if (me.loading)  {
    return (
      <div id="loading">
        <svg x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" space="preserve" >
          <path fill="#e74c3c" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
            <animateTransform 
              attributeName="transform" 
              attributeType="XML" 
              type="rotate"
              dur="1s" 
              from="0 50 50"
              to="360 50 50" 
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    )
  }
  return (
    <div>
      <p>Books in your favorite genre <b>{me.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {
            result.data.allBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )
          }
        </tbody>
      </table>
      
    </div>
  )
}

export default Recommend
