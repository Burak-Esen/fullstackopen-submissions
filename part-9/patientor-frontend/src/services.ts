import axios from "axios";
import { apiBaseUrl } from "./constants";
import { Patient } from "./types";
import {
  setPatientList,
  Action,
  addPatient,
  getAPatient
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
