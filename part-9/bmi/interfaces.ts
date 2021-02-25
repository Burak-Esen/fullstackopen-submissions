export interface webExerciseReqBody {
  body:{
    daily_exercises:Array<number>
    target:number
  }
}

export interface webExerciseRes {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json: (arg:any) => void 
}
