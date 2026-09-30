import { create } from 'zustand'

export const useNotificationStore = create((set) => ({
  message: null,
  type: 'success',

  notify: (message, type = 'success') => {
    set({ message, type })
    setTimeout(() => set({ message: null }), 5000)
  }
}))
