import { useAnecdoteStore } from '../store/anecdoteStore'

const Filter = () => {
  const setFilter = useAnecdoteStore((state) => state.setFilter)

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
