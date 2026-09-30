import { create } from 'zustand'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { getStoredUser, setStoredUser, clearStoredUser } from '../services/persistentUser'

export const useUserStore = create((set) => {
  const user = getStoredUser()
  if (user) {
    blogService.setToken(user.token)
  }

  return {
    user,

    login: async (credentials) => {
      const user = await loginService.login(credentials)
      setStoredUser(user)
      blogService.setToken(user.token)
      set({ user })
      return user
    },

    logout: () => {
      clearStoredUser()
      blogService.setToken(null)
      set({ user: null })
    }
  }
})
