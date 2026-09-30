import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE, ME } from '../queries'

const Books = ({ token }) => {
  const [genre, setGenre] = useState(null)

  const result = useQuery(ALL_BOOKS)
  const meResult = useQuery(ME, { skip: !token })
  const genreResult = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
    skip: !genre
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = genre
    ? genreResult.data
      ? genreResult.data.allBooks
      : []
    : result.data.allBooks

  const allGenres = [...new Set(result.data.allBooks.flatMap((b) => b.genres))]
  const favoriteGenre = meResult.data ? meResult.data.me.favoriteGenre : null

  return (
    <div>
      <h2>Books</h2>

      {favoriteGenre && (
        <p>
          in your favorite genre <b>{favoriteGenre}</b>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {allGenres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
