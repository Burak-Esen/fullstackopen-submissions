import React from 'react';
import { useStateValue } from "../state";
import { Segment, Header, Grid } from 'semantic-ui-react';
import { Entry } from '../types';
import { fetchPatient } from '../services';
import EntryDetails from './EntryDetails';

interface Props {
  id: string;
}

const PatientDetails = ({ id }: Props) => {
  const [{ patient }, dispatch] = useStateValue();
  React.useEffect(() => {
      try {
        fetchPatient(dispatch, id);
      } catch (e) {
        console.error(e);
      }
  }, [dispatch, id]);
  return (
    <Segment.Group style={{paddingBottom:"1rem"}} >
      <Grid padded>
          <Grid.Column floated="left"  >
            <Header as='h3' content={ patient?.name }
              dividing={true}
              icon={patient?.gender === 'male' ? "mars" : "venus" }
            />
          </Grid.Column>
      </Grid>
      <p style={{ marginLeft:'1rem' }}>Occupation: { patient?.occupation }</p>
      <p style={{ marginLeft:'1rem' }}>SSN: { patient?.ssn }</p>
      { patient?.entries && patient.entries.length ?
        <>
          <Header style={{ marginLeft:"1rem" }} as="h4" content="Entries" />
          { patient.entries.map((entry: Entry, i: number) => (
            <EntryDetails key={i} entry={entry} />
          ))}
        </> : null
      }
    </Segment.Group>
  );
};

export default PatientDetails;
