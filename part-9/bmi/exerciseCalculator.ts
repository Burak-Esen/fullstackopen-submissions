interface results {
  periodLength: number
  trainingDays: number
  target: number
  average: number
  success: boolean
  rating: number
  ratingDescription: string
}
const descriptions = [
  'too bad',
  'not too bad but could be better',
  'not bad',
  'good',
  'excellent'
]

const calculateExercises = (hours:number[], target:number) : results => {
  const average = hours.reduce((a,b)=>a+b)/hours.length
  const result = {
    periodLength:hours.length,
    trainingDays:hours.filter(h => h>0).length,
    target,
    average,
    success: average >= target,
    rating:Math.floor(average)+1,
    ratingDescription: Math.floor(average) < 5 ? descriptions[Math.floor(average)] : descriptions[4]
  }
  return result
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
