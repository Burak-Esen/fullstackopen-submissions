import React, { useState, useEffect } from 'react'

const Books = ({books, show}) => {
  const [genres, setGenres] = useState([])
  const [filteredBooks, setFBooks] = useState([])
  useEffect(() => {
    setFBooks(books)
    const genres = []
    books.forEach(b => {
      b.genres.forEach(g => genres.includes(g) ? null : genres.push(g))
    })
    setGenres(genres)
  }, [books])
  if (!show) {
    return null
  }
  const filter = e => {
    e.preventDefault()
    if(e.target.value==='all'){
      setFBooks(books)
    }else{
      setFBooks(books.filter(b => b.genres.includes(e.target.value)))
    }
  }
  return (
    <div>
      <h2>books</h2>
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
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{margin:"10px"}}>
        <button style={{margin:"10px"}} value="all" onClick={filter}>All</button>
        {
          genres.map((g, i) => <button
            value={g}
            style={{margin:"10px"}}
            key={i}
            onClick={filter}>
              {g}
          </button>)
        }
      </div>
    </div>
  )
}

export default Books