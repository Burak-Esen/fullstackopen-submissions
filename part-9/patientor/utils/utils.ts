/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from '../types';


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatientEntry = (obj:any): NewPatient => {
  const newEntry: NewPatient = {
    name:parseText(obj.name),
    dateOfBirth:parseDate(obj.dateOfBirth),
    gender:parseGender(obj.gender),
    occupation:parseText(obj.occupation),
    ssn:parseText(obj.ssn)
  };
  return newEntry;
};

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

const isString = (text: any): text is string => {
  return (typeof text) === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
