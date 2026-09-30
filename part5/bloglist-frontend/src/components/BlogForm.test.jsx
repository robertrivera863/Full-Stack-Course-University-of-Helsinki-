import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect, vi } from 'vitest'
import BlogForm from './BlogForm'

test('submits the form with correct data and clears the fields', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')

  await user.type(titleInput, 'React patterns')
  await user.type(authorInput, 'Michael Chan')
  await user.type(urlInput, 'https://reactpatterns.com/')

  await user.click(screen.getByText('Create'))

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/'
  })

  expect(titleInput.value).toBe('')
  expect(authorInput.value).toBe('')
  expect(urlInput.value).toBe('')
})
