/* eslint-disable @typescript-eslint/restrict-template-expressions */
const parseArguments = (args: Array<string>) => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height:number, weight:number):string => {
  const index = weight/(height/100)**2;
  let result = '';
  if (index<15) {
    result = 'Very severely underweight';
  } else if (index<16) {
    result = 'Severely underweight';
  } else if (index<18.5) {
    result = 'Underweight';
  } else if (index<25) {
    result = 'Normal (healthy weight)';
  } else if (index<30) {
    result = 'Overweight';
  } else if (index<35) {
    result = 'Obese Class I (Moderately obese)';
  } else if (index<40) {
    result = 'Obese Class II (Severely obese)';
  } else {
    result = 'Obese Class III (Very severely obese)';
  }
  return result;
};
try{
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log(`Something is wrong. ${e.message}`);
}
