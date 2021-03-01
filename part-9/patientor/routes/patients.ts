import express from 'express';
const router = express.Router();
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils/utils';

router.get('/', (_req, res) => {
  res.json(patientService.getSafePatients());
});

router.post('/', (req, res) => {
  try {
    const NewPatient = toNewPatientEntry(req.body);
    const addedOne = patientService.addPatient(NewPatient);
    res.json(addedOne);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;
