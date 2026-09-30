import { useUnicafeStore } from './unicafeStore'

const App = () => {
  const { good, neutral, bad, voteGood, voteNeutral, voteBad } = useUnicafeStore()

  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positive = total === 0 ? 0 : (good / total) * 100

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={voteGood}>good</button>
      <button onClick={voteNeutral}>neutral</button>
      <button onClick={voteBad}>bad</button>

      <h2>Statistics</h2>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <td>good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>bad</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>all</td>
              <td>{total}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{average}</td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{positive}%</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App
