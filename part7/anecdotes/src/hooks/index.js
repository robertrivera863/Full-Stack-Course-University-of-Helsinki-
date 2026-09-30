import { useState, useEffect, useSyncExternalStore } from 'react'
import anecdoteService from '../services/anecdotes'

// --- useField (7.1–7.3) ---
export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')

  return { type, value, onChange, reset }
}

// --- useAnecdotes (7.4–7.6) ---
// Shared module-level state so components can consume the data without
// passing anecdotes (or hook functions) down as props.
let anecdotesState = []
let initialized = false
const listeners = new Set()

const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getSnapshot = () => anecdotesState

const setAnecdotes = (anecdotes) => {
  anecdotesState = anecdotes
  listeners.forEach((listener) => listener())
}

export const useAnecdotes = () => {
  const anecdotes = useSyncExternalStore(subscribe, getSnapshot)

  useEffect(() => {
    if (!initialized) {
      initialized = true
      anecdoteService.getAll().then(setAnecdotes)
    }
  }, [])

  const addAnecdote = async (content) => {
    const newAnecdote = await anecdoteService.create(content)
    setAnecdotes(anecdotesState.concat(newAnecdote))
  }

  const deleteAnecdote = async (id) => {
    await anecdoteService.remove(id)
    setAnecdotes(anecdotesState.filter((a) => a.id !== id))
  }

  return { anecdotes, addAnecdote, deleteAnecdote }
}
