import { Patient, NewPatient, nonSsnPatient } from '../types';
import {v1 as uuid} from 'uuid';
import patientsData from '../data/patients';

const allPatients:Patient[] = patientsData;

const getSafePatients = (): nonSsnPatient[] => {
  return allPatients.map( el => ({
      dateOfBirth:el.dateOfBirth,
      gender:el.gender,
      id:el.id,
      name:el.name,
      occupation:el.occupation
    })
  );
};

const getAPatient = (id: string): Patient | undefined => {
  const patient = allPatients.find(el => el.id === id);
  return patient;
};

const addPatient = (obj:NewPatient): Patient => {
  const newP = {
    id:uuid(),
    name:obj.name,
    dateOfBirth:obj.dateOfBirth,
    gender:obj.gender,
    occupation:obj.occupation,
    ssn:obj.ssn
  } as Patient;
  allPatients.push(newP);
  return newP;
};

export default {
  getSafePatients,
  addPatient,
  getAPatient
};
