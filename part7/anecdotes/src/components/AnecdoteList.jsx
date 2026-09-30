import { useAnecdotes } from '../hooks'

const AnecdoteList = () => {
  const { anecdotes, deleteAnecdote } = useAnecdotes()

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => deleteAnecdote(anecdote.id)}>delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
