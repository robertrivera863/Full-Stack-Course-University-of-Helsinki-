import { create } from 'zustand'
import anecdoteService from '../services/anecdotes'

export const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  notification: null,

  initialize: async () => {
    const anecdotes = await anecdoteService.getAll()
    set({ anecdotes })
  },

  create: async (content) => {
    const newAnecdote = await anecdoteService.create(content)
    set((state) => ({
      anecdotes: state.anecdotes.concat(newAnecdote),
      notification: `you created '${newAnecdote.content}'`
    }))
  },

  vote: async (id) => {
    const anecdote = get().anecdotes.find((a) => a.id === id)
    const updated = await anecdoteService.vote(id, {
      ...anecdote,
      votes: anecdote.votes + 1
    })
    set((state) => ({
      anecdotes: state.anecdotes.map((a) => (a.id === id ? updated : a)),
      notification: `you voted '${updated.content}'`
    }))
  },

  remove: async (id) => {
    const anecdote = get().anecdotes.find((a) => a.id === id)
    await anecdoteService.remove(id)
    set((state) => ({
      anecdotes: state.anecdotes.filter((a) => a.id !== id),
      notification: `you deleted '${anecdote.content}'`
    }))
  },

  setFilter: (filter) => set({ filter }),
  setNotification: (message) => set({ notification: message }),
  clearNotification: () => set({ notification: null })
}))
