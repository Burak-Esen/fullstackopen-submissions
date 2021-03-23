import express from 'express';
const router = express.Router();
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils/utils';

router.get('/', (_req, res) => {
  res.json(patientService.getSafePatients());
});

router.get('/:id',(req, res) => {
  const patient = patientService.getAPatient(req.params.id);
  if (patient){
    res.json(patient).end();
  } else {
    res.status(404).json({ error:"Patient not found" });
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.getAPatient(req.params.id);
  if (patient){
    try {
      const newEntry = toNewEntry(req.body);
      const addedEntry = patientService.addEntryToPatient(req.params.id, newEntry);
      res.json(addedEntry).end();
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      res.status(400).send(e.message);
    }
  } else {
    res.status(404).json({ error:"Patient not found" });
  }
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
