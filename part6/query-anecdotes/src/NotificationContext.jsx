import { createContext, useReducer } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const notify = (message) => {
    notificationDispatch({ type: 'SET', payload: message })
    setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
  }

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
