import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect } from 'vitest'
import Togglable from './Togglable'

test('toggles children visibility', async () => {
  const user = userEvent.setup()

  render(
    <Togglable buttonLabel="show">
      <div>hidden content</div>
    </Togglable>
  )

  const content = screen.getByText('hidden content')
  expect(content.parentNode).toHaveStyle('display: none')

  await user.click(screen.getByText('show'))
  expect(content.parentNode).toHaveStyle('display: block')

  await user.click(screen.getByText('cancel'))
  expect(content.parentNode).toHaveStyle('display: none')
})
