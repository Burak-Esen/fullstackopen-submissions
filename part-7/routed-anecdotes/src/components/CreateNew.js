import React from 'react'
import useField from '../customHooks/input'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    props.setAnecdotes(props.anecdotes.concat(anecdote))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content:content.value,
      author:author.value,
      info:info.value,
      votes: 0
    })
    props.makeNotification(`A new anecdote: ${content.value} created!`)
  }

  const resetFields = () => {
    content.refresh()
    author.refresh()
    info.refresh()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input name='author' value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input name='info' value={info.value} onChange={info.onChange} />
        </div>
        <button>create</button>
        <button type="button" onClick={resetFields}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
