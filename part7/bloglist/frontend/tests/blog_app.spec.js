// End-to-end tests (exercises 5.23 & 5.28).
//
// To run these you need:
//   1. The backend running on http://localhost:3003 against a TEST database.
//   2. A "reset" route in the backend so each test starts from a clean DB, e.g.
//        if (process.env.NODE_ENV === 'test') {
//          const testingRouter = require('./controllers/testing')
//          app.use('/api/testing', testingRouter)
//        }
//      where testingRouter exposes POST /api/testing/reset.
//   3. Browser binaries installed:  npx playwright install
import { test, expect, beforeEach, describe } from '@playwright/test'

describe('Blog app', () => {
  beforeEach(async ({ request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: { username: 'root', name: 'Root', password: 'sekret' }
    })
    await request.get('/')
  })

  const login = async (page) => {
    await page.getByRole('link', { name: 'Log in' }).click()
    await page.getByPlaceholder('username').fill('root')
    await page.getByPlaceholder('password').fill('sekret')
    await page.getByRole('button', { name: 'Login' }).click()
  }

  test('login succeeds with correct credentials', async ({ page }) => {
    await login(page)
    await expect(page.getByText('Root logged in')).toBeVisible()
  })

  test('login fails with wrong credentials', async ({ page }) => {
    await page.getByRole('link', { name: 'Log in' }).click()
    await page.getByPlaceholder('username').fill('root')
    await page.getByPlaceholder('password').fill('wrong')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByText('Wrong username or password')).toBeVisible()
  })

  test('a logged-in user can create a blog', async ({ page }) => {
    await login(page)

    await page.getByRole('link', { name: 'New blog' }).click()
    await page.getByPlaceholder('title').fill('E2E blog')
    await page.getByPlaceholder('author').fill('E2E author')
    await page.getByPlaceholder('url').fill('http://example.com')
    await page.getByRole('button', { name: 'Create' }).click()

    await expect(page.getByText('E2E blog — E2E author')).toBeVisible()
  })

  test('a logged-in user can like a blog', async ({ page }) => {
    await login(page)

    await page.getByRole('link', { name: 'New blog' }).click()
    await page.getByPlaceholder('title').fill('Liked blog')
    await page.getByPlaceholder('author').fill('Author')
    await page.getByPlaceholder('url').fill('http://example.com')
    await page.getByRole('button', { name: 'Create' }).click()

    await page.getByRole('link', { name: 'Liked blog — Author' }).click()
    await page.getByRole('button', { name: 'Like' }).click()

    await expect(page.getByText('Likes: 1')).toBeVisible()
  })

  test('a logged-in user can delete a blog', async ({ page }) => {
    await login(page)

    await page.getByRole('link', { name: 'New blog' }).click()
    await page.getByPlaceholder('title').fill('Delete me')
    await page.getByPlaceholder('author').fill('Author')
    await page.getByPlaceholder('url').fill('http://example.com')
    await page.getByRole('button', { name: 'Create' }).click()

    await page.getByRole('link', { name: 'Delete me — Author' }).click()

    page.on('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: 'Delete' }).click()

    await expect(page.getByText('Delete me — Author')).not.toBeVisible()
  })
})
