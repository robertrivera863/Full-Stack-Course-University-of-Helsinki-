import { useAnecdotes } from '../hooks/useAnecdotes'
import { useNotify } from '../hooks/useNotify'

const AnecdoteList = () => {
  const { anecdotes, vote } = useAnecdotes()
  const { notify } = useNotify()

  const handleVote = (anecdote) => {
    vote(anecdote, {
      onSuccess: () => notify(`you voted '${anecdote.content}'`)
    })
  }

  const sorted = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sorted.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
