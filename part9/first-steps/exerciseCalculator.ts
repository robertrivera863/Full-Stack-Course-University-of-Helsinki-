interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export const calculateExercises = (
  dailyHours: number[],
  target: number
): Result => {
  const periodLength = dailyHours.length
  const trainingDays = dailyHours.filter((h) => h > 0).length
  const average =
    dailyHours.reduce((sum, h) => sum + h, 0) / periodLength
  const success = average >= target

  let rating: number
  let ratingDescription: string

  const ratio = average / target

  if (ratio < 0.5) {
    rating = 1
    ratingDescription = 'bad'
  } else if (ratio < 1) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 3
    ratingDescription = 'great'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}
