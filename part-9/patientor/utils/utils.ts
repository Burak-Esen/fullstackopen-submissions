/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatient, NewEntry, Gender, HealthCheckRating,
  Diagnosis, Discharge, SickLeave
} from '../types';


export const toNewPatientEntry = (obj:NewPatient): NewPatient => {
  const newEntry: NewPatient = {
    name:parseText(obj.name),
    dateOfBirth:parseDate(obj.dateOfBirth),
    gender:parseGender(obj.gender),
    occupation:parseText(obj.occupation),
    ssn:parseText(obj.ssn),
    entries: []
  };
  return newEntry;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toNewEntry = (obj:NewEntry): NewEntry => {
  switch (obj.type) {
    case 'HealthCheck':
      const newHCEntry: NewEntry = {
        type: obj.type,
        description: parseText(obj.description),
        date: parseDate(obj.date),
        specialist: parseText(obj.specialist),
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating)
      };
      if (obj.diagnosisCodes && obj.diagnosisCodes.length) {
        newHCEntry.diagnosisCodes = parseDiagnosisList(obj.diagnosisCodes);
      }
      return newHCEntry;
    case 'Hospital':
      const newHEntry: NewEntry = {
        type: obj.type,
        description: parseText(obj.description),
        date: parseDate(obj.date),
        specialist: parseText(obj.specialist),
      };
      if (obj.diagnosisCodes && obj.diagnosisCodes.length) {
        newHEntry.diagnosisCodes = parseDiagnosisList(obj.diagnosisCodes);
      }
      if (obj.discharge) {
        newHEntry.discharge = parseDischarge(obj.discharge);
      }
      return newHEntry;
    case 'OccupationalHealthcare':
      const newOHEntry: NewEntry = {
        type: obj.type,
        description: parseText(obj.description),
        date: parseDate(obj.date),
        specialist: parseText(obj.specialist),
      };
      if (obj.diagnosisCodes && obj.diagnosisCodes.length) {
        newOHEntry.diagnosisCodes = parseDiagnosisList(obj.diagnosisCodes);
      }
      if (obj.employerName) {
        newOHEntry.employerName = parseText(obj.employerName);
      }
      if (obj.sickLeave) {
        newOHEntry.sickLeave = parseSickLeave(obj.sickLeave);
      }
      return newOHEntry;
    default:
      return assertNever(obj);
  }
};


// parse types
const parseText = (text:any): string => {
  if(!text || !isString(text)) {
    throw new Error(`Incorrect or missing text: ${String(text)}`);
  }
  return text;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${String(date)}`);
  }
  return date;
};

const parseGender = (gender:any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${String(gender)}`);
  }
  return gender;
};

const parseHealthCheckRating = (raiting:any): HealthCheckRating => {
  if (!raiting || !isHealthCheckRating(raiting)) {
    throw new Error(`Incorrect or missing Health Check Raiting: ${String(raiting)}`);
  }
  return raiting;
};

const parseDiagnosisList = (list:any[]): Array<Diagnosis['code']> => {
  if (!list.every(el => isString(el))) {
    throw new Error(`Incorrect diagnosis Codes: ${String(list)}`);
  }
  return list.map(el => parseText(el));
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error(`Incorrect or missing Discharge parameters: ${String(discharge)}`);
  }
  return discharge;
};

const parseSickLeave = (sickleave: any): SickLeave => {
  if(!sickleave || !isSickLeave(sickleave)) {
    throw new Error(`Incorrect or missing Sick-Leave parameters: ${String(sickleave)}`);
  }
  return sickleave;
};

// check types
const isString = (text: any): text is string => {
  return (typeof text) === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isDischarge = (param: any): param is Discharge => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return (Boolean(param.date) && isDate(param.date) && isString(param.criteria));
};

const isSickLeave = (param: any): param is SickLeave => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return (Boolean(param.endDate) && Boolean(param.startDate) && isDate(param.endDate) && isDate(param.startDate));
};