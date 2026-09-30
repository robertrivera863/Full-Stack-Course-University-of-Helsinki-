import { useState, useEffect } from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import SingleBlog from './components/SingleBlog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Navbar from './components/Navbar'
import { Container } from './styled/components'

import blogService from './services/blogs'
import loginService from './services/login'

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
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 5000)
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      notify(`Welcome back, ${user.name}`)
      navigate('/')
    } catch {
      notify('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    navigate('/')
  }

  const createBlog = async (newBlog) => {
    try {
      const created = await blogService.create(newBlog)
      setBlogs(blogs.concat(created))
      notify(`A new blog "${created.title}" was added`)
      navigate('/')
    } catch {
      notify('Could not create blog', 'error')
    }
  }

  const handleLike = async (blog) => {
    const updated = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null
    })
    setBlogs(blogs.map((b) => (b.id === updated.id ? { ...updated, user: blog.user } : b)))
  }

  const handleDelete = async (blog) => {
    if (!window.confirm(`Delete "${blog.title}"?`)) return

    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
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
      <Notification message={message} />

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
            <SingleBlog
              blogs={blogs}
              user={user}
              handleLike={handleLike}
              handleDelete={handleDelete}
            />
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
                <BlogForm createBlog={createBlog} />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Container>
  )
}

export default App
