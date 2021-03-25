import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  } | {
    type: "ADD_PATIENT";
    payload: Patient;
  } | {
    type: "GET_A_PATIENT";
    payload: Patient;
  } | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  } | {
    type: "ADD_NEW_ENTRY";
    payload: Entry;
    patient: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_NEW_ENTRY":
      if (!action.patient.entries) {
        action.patient.entries = [];
      }
      action.patient.entries.push(action.payload);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.patient.id]:action.patient
        }
      };
    case "GET_A_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type:"SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};

export const getAPatient = (patient: Patient): Action => {
  return {
    type: "GET_A_PATIENT",
    payload: patient
  };
};

export const setDiagnosisList = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnoses
  };
};

export const addNewEntry = (entry: Entry, patient: Patient): Action => {
  return {
    type: "ADD_NEW_ENTRY",
    payload: entry,
    patient: patient
  };
};
