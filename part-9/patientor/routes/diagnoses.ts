import express from 'express';
const router = express.Router();
import diagnoseData from '../data/diagnoses.json';
import {diagnose} from '../types';

const diagnoses = diagnoseData as diagnose[];

router.get('/', (_req, res) => {
  res.json(diagnoses);
});

export default router;
