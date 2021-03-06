import React, { useState, useEffect } from 'react'
import './app.css'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS, BOOK_ADDED } from './queries'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { ME } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const me = useQuery(ME)

  const logoutHandler = () => {
    setToken(null)
    localStorage.removeItem('libraryapp-user-token')
    client.resetStore()
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert('New Book added:'+addedBook.title)
      updateCacheWith(addedBook)
    }
  })

  useEffect(() => {
    const tok = localStorage.getItem('libraryapp-user-token')
    if (tok){
      setToken(tok)
    }
  }, [token])

  if (books.loading || authors.loading || me.loading)  {
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
        <button style={{margin:"5px"}} onClick={() => setPage('authors')}>authors</button>
        <button style={{margin:"5px"}} onClick={() => setPage('books')}>books</button>
        { token 
          ? <>
              <button style={{margin:"5px"}} onClick={() => setPage('recommend')}>Recommend</button>
              <button style={{margin:"5px"}} onClick={() => setPage('add')}>add book</button>
              <button style={{margin:"5px"}} onClick={logoutHandler}>Logout</button>
            </>
          : <button style={{margin:"5px"}} onClick={() => setPage('login')}>login</button>
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
        ? <>
            <Recommend show={page === 'recommend'} me={me.data.me} />
            <NewBook show={page === 'add'} me={me.data.me} />
          </>
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