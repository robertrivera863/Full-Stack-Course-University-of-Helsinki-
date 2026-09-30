const KEY = 'loggedBlogappUser'

export const getStoredUser = () => {
  const loggedUserJSON = window.localStorage.getItem(KEY)
  return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
}

export const setStoredUser = (user) => {
  window.localStorage.setItem(KEY, JSON.stringify(user))
}

export const clearStoredUser = () => {
  window.localStorage.removeItem(KEY)
}
