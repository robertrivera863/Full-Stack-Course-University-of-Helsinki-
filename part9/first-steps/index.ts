import express from 'express'
import { calculateBmi } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'

const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' })
  }

  const bmi = calculateBmi(height, weight)
  return res.json({ weight, height, bmi })
})

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' })
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((h) => isNaN(Number(h))) ||
    isNaN(Number(target))
  ) {
    return res.status(400).json({ error: 'malformatted parameters' })
  }

  const dailyHours = daily_exercises.map((h) => Number(h))
  const result = calculateExercises(dailyHours, Number(target))
  return res.json(result)
})

const PORT = 3002

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
