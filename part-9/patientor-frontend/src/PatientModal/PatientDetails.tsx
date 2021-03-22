import React from 'react';
import { Patient } from "../types";
import { useStateValue } from "../state";
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { Segment, Divider } from 'semantic-ui-react';
import { Entry } from '../types';

interface Props {
  id: string;
}

const PatientDetails = ({ id }: Props) => {
  const [{ patient }, dispatch] = useStateValue();
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "GET_A_PATIENT", payload: patientFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [dispatch, id]);
  return (
    <Segment.Group>
      <Segment>Name: {patient?.name}</Segment>
      <Segment>Occupation: {patient?.occupation}</Segment>
      <Segment>Birth Date: {patient?.dateOfBirth}</Segment>
      <Segment>Gender: {patient?.gender}</Segment>
      <Segment>SSN: {patient?.ssn}</Segment>
      <Segment>Entries:</Segment>
      {patient?.entries && patient.entries.map((entry: Entry, i: number) => (
        <Segment.Group key={i}>
          <Segment>{entry.code}</Segment>
          <Segment>{entry.latin}</Segment>
          <Segment>{entry.name}</Segment>
          <Divider/>
        </Segment.Group>
      ))}
    </Segment.Group>
  );
};

export default PatientDetails;
