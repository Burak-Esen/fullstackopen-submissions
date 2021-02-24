/*
Category	BMI (kg/m2)
                                        from	  to
Very severely underweight                 -		  15
Severely underweight                    	15	  16
Underweight                             	16	  18.5
Normal (healthy weight)                 	18.5  25
Overweight	                              25	  30
Obese Class I (Moderately obese)        	30	  35
Obese Class II (Severely obese)	          35	  40
Obese Class III (Very severely obese)   	40    -
*/

const parseArguments = (args: Array<string>) => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height:number, weight:number):string => {
  const index = weight/(height/100)**2
  let result = ''
  if (index<15) {
    result = 'Very severely underweight'
  } else if (index<16) {
    result = 'Severely underweight'
  } else if (index<18.5) {
    result = 'Underweight'
  } else if (index<25) {
    result = 'Normal (healthy weight)'
  } else if (index<30) {
    result = 'Overweight'
  } else if (index<35) {
    result = 'Obese Class I (Moderately obese)'
  } else if (index<40) {
    result = 'Obese Class II (Severely obese)'
  } else {
    result = 'Obese Class III (Very severely obese)'
  }
  return result
}
try{
  const { height, weight } = parseArguments(process.argv)
  console.log(calculateBmi(height, weight))
} catch (e) {
  console.log('Something is wrong. ' + e.message)
}
