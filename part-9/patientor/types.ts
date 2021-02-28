export interface Diagnose {
  code:string
  name:string,
  latin?:string
}

type Gender = 'male' | 'female';

export interface Patient {
  id:string
  name:string
  dateOfBirth: "1986-07-09",
  ssn:string
  gender:Gender
  occupation:string
}

export type nonSsnPatient = Omit<Patient, 'ssn'>;
