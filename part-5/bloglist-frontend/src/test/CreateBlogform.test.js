import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import CreateBlogForm from '../components/CreateBlogForm'

test('renders content', () => {
  const component = render(<CreateBlogForm />)

  const titleInput = component.getByTestId('testTitle')
  const authorInput = component.getByTestId('testAuthor')
  const urlInput = component.getByTestId('testUrl')
  const form = component.getByTestId('blogForm')

  expect(titleInput).toHaveAttribute('id','title')
  expect(authorInput).toHaveAttribute('id','author')
  expect(urlInput).toHaveAttribute('id','url')

  expect(form).toContainElement(titleInput)
  expect(form).toContainElement(authorInput)
  expect(form).toContainElement(urlInput)
})
