export interface diagnose {
  code:string
  name:string,
  latin?:string
}

type gender = 'male' | 'female';

export interface patient {
  id:string
  name:string
  dateOfBirth: "1986-07-09",
  ssn:string
  gender:gender
  occupation:string
}
