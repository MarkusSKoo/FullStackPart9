import express from 'express';
import diagnosesService from '../services/diagnoseService.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = diagnosesService.getDiagnoses();
  res.send(data);
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default router;