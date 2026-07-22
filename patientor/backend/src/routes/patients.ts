import express, { type Request, type Response } from 'express';
import patientService from '../services/patientService.ts';
import { newPatientParser, errorMiddleware } from '../middleware.ts';
import { type NewPatientEntry, type NonSensitivePatientEntry, type PatientEntry } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  const data = patientService.getNonSensitivePatients();
  res.send(data);
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;