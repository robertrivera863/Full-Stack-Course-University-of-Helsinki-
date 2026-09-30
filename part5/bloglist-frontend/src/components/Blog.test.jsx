import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect, vi } from 'vitest'
import Blog from './Blog'

const blog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user: { username: 'root', name: 'Root' }
}

test('shows blog info and likes, but no buttons, to unauthenticated users', () => {
  render(
    <Blog
      blog={blog}
      handleLike={vi.fn()}
      handleDelete={vi.fn()}
      canLike={false}
      canDelete={false}
    />
  )

  expect(screen.getByText('React patterns')).toBeInTheDocument()
  expect(screen.getByText('Likes: 7')).toBeInTheDocument()
  expect(screen.queryByText('Like')).not.toBeInTheDocument()
  expect(screen.queryByText('Delete')).not.toBeInTheDocument()
})

test('shows only the like button to an authenticated non-creator', () => {
  render(
    <Blog
      blog={blog}
      handleLike={vi.fn()}
      handleDelete={vi.fn()}
      canLike
      canDelete={false}
    />
  )

  expect(screen.getByText('Like')).toBeInTheDocument()
  expect(screen.queryByText('Delete')).not.toBeInTheDocument()
})

test('shows like and delete buttons to the creator', () => {
  render(
    <Blog
      blog={blog}
      handleLike={vi.fn()}
      handleDelete={vi.fn()}
      canLike
      canDelete
    />
  )

  expect(screen.getByText('Like')).toBeInTheDocument()
  expect(screen.getByText('Delete')).toBeInTheDocument()
})

test('clicking like calls the handler once with the blog', async () => {
  const handleLike = vi.fn()
  const user = userEvent.setup()

  render(
    <Blog
      blog={blog}
      handleLike={handleLike}
      handleDelete={vi.fn()}
      canLike
      canDelete={false}
    />
  )

  await user.click(screen.getByText('Like'))

  expect(handleLike).toHaveBeenCalledTimes(1)
  expect(handleLike).toHaveBeenCalledWith(blog)
})
