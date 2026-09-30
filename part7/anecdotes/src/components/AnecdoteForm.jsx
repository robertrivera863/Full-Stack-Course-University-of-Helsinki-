import { useField, useAnecdotes } from '../hooks'

const AnecdoteForm = () => {
  const { reset: resetContent, ...content } = useField('text')
  const { addAnecdote } = useAnecdotes()

  const handleSubmit = (event) => {
    event.preventDefault()
    addAnecdote(content.value)
    resetContent()
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input {...content} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={resetContent}>
          reset
        </button>
      </form>
    </div>
  )
}

export default AnecdoteForm
