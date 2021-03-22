import React from 'react';
import { useStateValue } from "../state";
import { Segment, Divider, Icon } from 'semantic-ui-react';
import { Entry, Diagnosis } from '../types';
import { fetchPatient } from '../services';

interface Props {
  id: string;
}

const PatientDetails = ({ id }: Props) => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  React.useEffect(() => {
      try {
        fetchPatient(dispatch, id);
      } catch (e) {
        console.error(e);
      }
  }, [dispatch, id]);
  return (
    <Segment.Group>
      <Segment>
        Name: { patient?.name } - 
        { patient?.gender === 'male' 
          ? <Icon name="mars" size="large" />
          : <Icon name="venus" size="large" />
        }
      </Segment>
      <Segment size="large">Occupation: { patient?.occupation }</Segment>
      <Segment size="large">Birth Date: { patient?.dateOfBirth }</Segment>
      <Segment size="large">SSN: { patient?.ssn }</Segment>
      <Segment size="large">Entries:</Segment>
      {patient?.entries && patient.entries.map((entry: Entry, i: number) => (
        <Segment.Group key={ i }>
          <Segment>{ entry.date } -- { entry.description }</Segment>
          { entry.diagnosisCodes && entry.diagnosisCodes.length ?
            <Segment size="tiny">
              <ul> <b>Diagnosis Code - Description</b>
                {
                  entry.diagnosisCodes.map((code: Diagnosis['code'], i: number) => (
                    <li key={i} >{ code } -- {diagnoses[code].name}</li>
                  ))
                }
              </ul>
            </Segment> : null
          }
          <Divider/>
        </Segment.Group>
      ))}
    </Segment.Group>
  );
};

export default PatientDetails;
