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

const parseArgs = (args: Array<string>) => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const hourValues = args.slice(3).map(v => Number(v))
  if (!isNaN(Number(args[2])) && hourValues.every(v => !isNaN(v))) {
    return {
      target: Number(args[2]),
      hours: hourValues
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

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

try {
  const { hours, target } = parseArgs(process.argv)
  console.log(calculateExercises(hours, target))
} catch (e) {
  console.log('Something is wrong. ' + e.message)
}
