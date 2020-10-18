import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

test('renders content', () => {
  const blog = {
    previewUrl:'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png',
    likes:9,
    title:'link-preview-generator',
    author:'Andrej Gajdos/npm',
    url:'https://www.npmjs.com/package/link-preview-generator'
  }

  const mockHandler = jest.fn()
  const component = render(<Blog blog={blog} getTokenFromWindow={mockHandler} setBlogs={mockHandler} />)

  expect(component.container).toHaveTextContent('link-preview-generato')
  expect(component.container).toHaveTextContent('Andrej Gajdos/npm')
  expect(component.container).not.toHaveTextContent('likes')
  expect(component.container).not.toHaveTextContent('Url')
  expect(component.container).not.toHaveTextContent('Category')
})