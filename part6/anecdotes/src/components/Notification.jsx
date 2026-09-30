import { useAnecdoteStore } from '../store/anecdoteStore'

const Notification = () => {
  const notification = useAnecdoteStore((state) => state.notification)

  if (!notification) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return <div style={style}>{notification}</div>
}

export default Notification
