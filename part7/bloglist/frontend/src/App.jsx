import { useEffect } from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useBlogStore } from './stores/blogStore'
import { useUserStore } from './stores/userStore'
import { useNotificationStore } from './stores/notificationStore'

import SingleBlog from './components/SingleBlog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import Navbar from './components/Navbar'
import ErrorBoundary from './ErrorBoundary'
import { Container } from './styled/components'

const PageTitle = styled.h2`
  color: #202124;
  margin-bottom: 1rem;
`

const BlogList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const BlogLink = styled(Link)`
  color: #1a73e8;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 0;

  &:hover {
    text-decoration: underline;
  }
`

const ButtonLink = styled(Link)`
  display: inline-block;
  background: #1a73e8;
  color: white;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #1557b0;
  }
`

const App = () => {
  const blogs = useBlogStore((state) => state.blogs)
  const initializeBlogs = useBlogStore((state) => state.initialize)
  const createBlog = useBlogStore((state) => state.createBlog)
  const likeBlog = useBlogStore((state) => state.likeBlog)
  const removeBlog = useBlogStore((state) => state.removeBlog)

  const user = useUserStore((state) => state.user)
  const login = useUserStore((state) => state.login)
  const logout = useUserStore((state) => state.logout)

  const notify = useNotificationStore((state) => state.notify)

  const navigate = useNavigate()

  useEffect(() => {
    initializeBlogs()
  }, [initializeBlogs])

  const handleLogin = async (credentials) => {
    try {
      const user = await login(credentials)
      notify(`Welcome back, ${user.name}`)
      navigate('/')
    } catch {
      notify('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleCreate = async (newBlog) => {
    try {
      const created = await createBlog(newBlog)
      notify(`A new blog "${created.title}" was added`)
      navigate('/')
    } catch {
      notify('Could not create blog', 'error')
    }
  }

  const handleLike = async (blog) => {
    try {
      await likeBlog(blog)
    } catch {
      notify('Could not like blog', 'error')
    }
  }

  const handleDelete = async (blog) => {
    if (!window.confirm(`Delete "${blog.title}"?`)) return

    try {
      await removeBlog(blog.id)
      notify(`Deleted "${blog.title}"`)
      navigate('/')
    } catch {
      notify('Could not delete blog', 'error')
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <Container>
      <Navbar user={user} handleLogout={handleLogout} />
      <Notification />
      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <PageTitle>Blogs</PageTitle>
                {user && <ButtonLink to="/create">New blog</ButtonLink>}
                <BlogList>
                  {sortedBlogs.map((blog) => (
                    <BlogLink key={blog.id} to={`/blogs/${blog.id}`}>
                      {blog.title} — {blog.author}
                    </BlogLink>
                  ))}
                </BlogList>
              </div>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <SingleBlog handleLike={handleLike} handleDelete={handleDelete} />
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <div>
                  <PageTitle>Log in to the application</PageTitle>
                  <LoginForm handleLogin={handleLogin} />
                </div>
              )
            }
          />
          <Route
            path="/create"
            element={
              user ? (
                <div>
                  <PageTitle>Create new blog</PageTitle>
                  <BlogForm createBlog={handleCreate} />
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="*" element={<PageTitle>Page not found</PageTitle>} />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App
