import { describe, test, expect, vi, beforeEach } from 'vitest'
import { useAnecdoteStore } from './anecdoteStore'
import anecdoteService from '../services/anecdotes'

vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    vote: vi.fn(),
    remove: vi.fn()
  }
}))

const initialAnecdotes = [
  { id: '1', content: 'If it hurts, do it more often', votes: 0 },
  { id: '2', content: 'Premature optimization is the root of all evil.', votes: 3 }
]

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '', notification: null })
  vi.clearAllMocks()
})

test('state is initialized with the anecdotes returned by the backend', async () => {
  anecdoteService.getAll.mockResolvedValue(initialAnecdotes)

  await useAnecdoteStore.getState().initialize()

  expect(useAnecdoteStore.getState().anecdotes).toEqual(initialAnecdotes)
})

test('voting increases the number of votes for an anecdote', async () => {
  anecdoteService.vote.mockImplementation(async (id, updated) => updated)
  useAnecdoteStore.setState({ anecdotes: initialAnecdotes })

  await useAnecdoteStore.getState().vote('1')

  const voted = useAnecdoteStore.getState().anecdotes.find((a) => a.id === '1')
  expect(voted.votes).toBe(1)
})
