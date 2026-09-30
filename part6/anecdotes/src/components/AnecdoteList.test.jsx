import { render, screen } from '@testing-library/react'
import { describe, test, expect, beforeEach } from 'vitest'
import { useAnecdoteStore } from '../store/anecdoteStore'
import AnecdoteList from './AnecdoteList'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '', notification: null })
})

describe('AnecdoteList', () => {
  test('anecdotes are sorted by votes in descending order', () => {
    useAnecdoteStore.setState({
      anecdotes: [
        { id: '1', content: 'one', votes: 1 },
        { id: '2', content: 'two', votes: 5 },
        { id: '3', content: 'three', votes: 3 }
      ]
    })

    render(<AnecdoteList />)

    const contents = screen.getAllByText(/one|two|three/).map((el) => el.textContent)
    expect(contents).toEqual(['two', 'three', 'one'])
  })

  test('only anecdotes matching the filter are shown', () => {
    useAnecdoteStore.setState({
      filter: 'two',
      anecdotes: [
        { id: '1', content: 'one', votes: 1 },
        { id: '2', content: 'two', votes: 2 }
      ]
    })

    render(<AnecdoteList />)

    expect(screen.getByText('two')).toBeInTheDocument()
    expect(screen.queryByText('one')).not.toBeInTheDocument()
  })
})
