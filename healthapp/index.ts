import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';
import { validateBmiValues, validateReqParams } from './utils.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!validateBmiValues(height, weight)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const result = calculateBmi(height, weight);
  res.json({
    weight: weight,
    height: height,
    bmi: result
  });
});

app.post('/exercises', (req, res) => {
  const body: unknown = req.body;

  if (
    typeof body !== 'object' ||
    body === null ||
    !('daily_exercises' in body) ||
    !('target' in body)
  ) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  if (!validateReqParams(req.body)) {
    res.status(400).json({ error: "malformatted parameters"});
    return;
  }

  const result: object = calculateExercises(req.body.daily_exercises, req.body.target);
  res.status(200).json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});