import { useState, useEffect, FormEvent } from 'react'
import axios from 'axios'
import { DiaryEntry, Weather, Visibility, NewDiaryEntry } from './types'

const baseUrl = 'http://localhost:3000/diaries'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState<Weather>(Weather.Sunny)
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
  const [comment, setComment] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    axios.get<DiaryEntry[]>(baseUrl).then((res) => setDiaries(res.data))
  }, [])

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newDiary: NewDiaryEntry = { date, weather, visibility, comment }

    try {
      const res = await axios.post<DiaryEntry>(baseUrl, newDiary)
      setDiaries(diaries.concat(res.data))
      setError(null)
      setComment('')
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        setError(
          typeof e.response.data === 'string'
            ? e.response.data
            : JSON.stringify(e.response.data)
        )
      } else {
        setError('unknown error')
      }
    }
  }

  return (
    <div>
      <h1>Flight diaries</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={submit}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          weather
          {Object.values(Weather).map((w) => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </div>
        <div>
          visibility
          {Object.values(Visibility).map((v) => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Diary entries</h2>
      {diaries.map((d) => (
        <div key={d.id}>
          <b>{d.date}</b> {d.weather} {d.visibility} <em>{d.comment}</em>
        </div>
      ))}
    </div>
  )
}

export default App
