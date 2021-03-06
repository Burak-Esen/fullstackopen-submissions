import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, checkArgs } from './exerciseCalculator';
import { webExerciseReqBody, webExerciseRes } from './interfaces';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    return res.json({ error: 'malformatted parameters' });
  }
  const bmiRes = {
    weight,
    height,
    bmi:calculateBmi(height, weight)
  };
  return res.json(bmiRes);
});

app.post('/exercises', express.json(), (req: webExerciseReqBody, res:webExerciseRes) => {
  const body = req.body;
  try {
    checkArgs(body.daily_exercises, body.target);
    const results = calculateExercises(body.daily_exercises, body.target);
    res.json(results);
  } catch {
    res.json({ error: "malformatted parameters" });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
