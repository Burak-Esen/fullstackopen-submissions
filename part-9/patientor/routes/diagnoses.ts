import express from 'express';
const router = express.Router();
import diagnoseData from '../data/diagnoses.json';
import {Diagnosis} from '../types';

const diagnosis = diagnoseData as Diagnosis[];

router.get('/', (_req, res) => {
  res.json(diagnosis);
});

export default router;
