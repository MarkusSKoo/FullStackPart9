import express, { type Request, type Response } from 'express';
import patientService from '../services/patientService.ts';
import { newPatientParser, newEntryParser, errorMiddleware } from '../middleware.ts';
import {
  type NewPatientEntry,
  type NonSensitivePatientEntry,
  type PatientEntry,
  type NewEntry,
  type Entry,
} from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  const data = patientService.getNonSensitivePatients();
  res.send(data);
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(String(req.params.id));
  if (patient) {
    res.send(patient);
  } else {
    res.status(404);
  }
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.post(
  '/:id/entries',
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, NewEntry>,
    res: Response<Entry>
  ) => {
    const addedEntry = patientService.addEntry(req.params.id, req.body);

    if (!addedEntry) {
      res.sendStatus(404);
      return;
    }

    res.status(201).json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;