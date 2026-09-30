import { useAnecdotes } from '../hooks/useAnecdotes'
import { useNotify } from '../hooks/useNotify'

const AnecdoteForm = () => {
  const { create } = useAnecdotes()
  const { notify } = useNotify()

  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    if (content.length < 5) {
      notify('anecdote must be at least 5 characters long')
      return
    }

    create(content, {
      onSuccess: (newAnecdote) => notify(`you created '${newAnecdote.content}'`),
      onError: () => notify('could not create anecdote')
    })
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
