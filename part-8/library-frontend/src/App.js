import React, { useState, useEffect } from 'react'
import './app.css'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS } from './queries'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logoutHandler = () => {
    setToken(null)
    localStorage.removeItem('libraryapp-user-token')
    client.resetStore()
  }

  useEffect(() => {
    const token = localStorage.getItem('libraryapp-user-token')
    if (token){
      setToken(token)
    }
  }, [])

  if (books.loading || authors.loading)  {
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
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token 
          ? <><button onClick={() => setPage('add')}>add book</button>
            <button onClick={logoutHandler}>Logout</button></>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>
      <div>
      <Authors authors={authors.data.allAuthors}
        isAuth={Boolean(token)}
        show={page === 'authors'}
      />
      <Books books={books.data.allBooks}
        show={page === 'books'}
      />
      { token
        ? <NewBook show={page === 'add'} />
        : <LoginForm
            show={page === 'login'}
            setToken={setToken}
            setPage={setPage}
          />
      }
      </div>
    </div>
  )
}

export default App