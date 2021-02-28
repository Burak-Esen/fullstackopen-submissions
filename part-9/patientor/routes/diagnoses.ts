import express from 'express';
const router = express.Router();
import diagnoseData from '../data/diagnoses.json';
import {Diagnose} from '../types';

const diagnoses = diagnoseData as Diagnose[];

router.get('/', (_req, res) => {
  res.json(diagnoses);
});

export default router;
