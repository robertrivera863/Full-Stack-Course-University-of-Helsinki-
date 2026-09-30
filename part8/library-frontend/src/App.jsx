import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('library-user-token')
    if (stored) {
      setToken(stored)
    }
  }, [])

  // 8.24–8.25 — subscribe to new books and keep the list up to date
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`New book added: ${addedBook.title}`)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => ({
        allBooks: allBooks.concat(addedBook)
      }))
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
    navigate('/')
  }

  return (
    <div>
      <nav>
        <Link to="/">authors</Link>{' '}
        <Link to="/books">books</Link>{' '}
        {token ? (
          <>
            <Link to="/add">add book</Link>{' '}
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <Link to="/login">login</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Authors token={token} />} />
        <Route path="/books" element={<Books token={token} />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </div>
  )
}

export default App
