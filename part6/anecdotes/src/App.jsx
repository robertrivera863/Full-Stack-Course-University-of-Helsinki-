import { useEffect } from 'react'
import { useAnecdoteStore } from './store/anecdoteStore'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const initialize = useAnecdoteStore((state) => state.initialize)
  const notification = useAnecdoteStore((state) => state.notification)
  const clearNotification = useAnecdoteStore((state) => state.clearNotification)

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => clearNotification(), 5000)
      return () => clearTimeout(timer)
    }
  }, [notification, clearNotification])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
