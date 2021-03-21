export interface Diagnose {
  code:string
  name:string,
  latin?:string
}

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {

}

export interface Patient {
  id:string
  name:string
  dateOfBirth: string
  ssn:string
  gender:Gender
  occupation:string
  entries: Array<Entry>
}

export type NewPatient = Omit<Patient, 'id'>;

export type nonSsnPatient = Omit<Patient, 'ssn' | 'entries'>;
