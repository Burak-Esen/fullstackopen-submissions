import axios from "axios";
import { apiBaseUrl } from "./constants";
import { Diagnosis, Entry, NewEntry, Patient } from "./types";
import {
  setPatientList, Action, addPatient,
  getAPatient, setDiagnosisList, addNewEntry
} from "./state";
import { PatientFormValues } from "./AddPatientModal/AddPatientForm";
type Dispatch = { (value: Action): void; (arg0: Action): void };

export const fetchPatientList = async (dispatch: Dispatch) => {
  try {
    const { data: patientListFromApi } = await axios.get<Patient[]>(
      `${apiBaseUrl}/patients`
    );
    dispatch(setPatientList(patientListFromApi));
  } catch (e) {
    console.error(e);
  }
};

export const submitNewPatient = async (
    values: PatientFormValues,
    dispatch: Dispatch,
    closeModal: VoidFunction,
  ) => {
  const { data: newPatient } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    values
  );
  dispatch(addPatient(newPatient));
  closeModal();
};

export const fetchPatient = async (dispatch: Dispatch, id: string) => {
  const { data: patientFromApi } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  dispatch(getAPatient(patientFromApi));
};

export const fetchDiagnoses = async (dispatch: Dispatch) => {
  try {
    const { data: diagnosesListFromApi} = await axios.get<Diagnosis[]>(
      `${apiBaseUrl}/diagnoses`
    );
    dispatch(setDiagnosisList(diagnosesListFromApi));
  } catch (e) {
    console.error(e);
  }
};

export const submitNewEntry = async (
  patient: Patient,
  values: NewEntry,
  dispatch: Dispatch,
  closeModal: VoidFunction
) => {
  const { data: newEntry } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patient.id}/entries`,
    values
  );
  dispatch(addNewEntry(newEntry, patient));
  closeModal();
};
