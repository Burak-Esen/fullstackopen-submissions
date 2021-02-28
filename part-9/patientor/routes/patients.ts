import express from 'express';
const router = express.Router();
import patientsData from '../data/patients.json';
import {nonSsnPatient, Patient} from '../types';

const getPatients = (data:Patient[]): nonSsnPatient[] => {
  return data.map( el => ({
      dateOfBirth:el.dateOfBirth,
      gender:el.gender,
      id:el.id,
      name:el.name,
      occupation:el.occupation
    })
  );
};

router.get('/', (_req, res) => {
  res.json(getPatients(patientsData as Patient[]));
});

export default router;
