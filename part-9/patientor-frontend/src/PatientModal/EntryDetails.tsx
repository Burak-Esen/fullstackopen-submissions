import React from 'react';
import { Entry, Diagnosis } from '../types';
import { Segment, Icon, Header, Grid, SemanticCOLORS } from 'semantic-ui-react';
import { useStateValue } from "../state";

interface Props {
  entry: Entry;
}
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry }: Props) => {
  const [{ diagnoses }, ] = useStateValue();
  const healthIconColors: SemanticCOLORS[] = ['green', 'yellow', 'orange', 'red' ];
  switch (entry.type) {
    case 'HealthCheck':
      return (
        <Segment.Group style={{paddingBottom:"1rem"}} >
          <Grid padded ><Grid.Column>
            <Header as="h4" content={entry.date} icon="user md" />
          </Grid.Column></Grid>
          <p style={{marginLeft:"1rem"}}>{entry.description}</p>
          { entry.diagnosisCodes && entry.diagnosisCodes.length ?
            <ul> <b>Diagnosis Code - Description</b>
              {
                entry.diagnosisCodes.map((code: Diagnosis['code'], i: number) => (
                  <li key={i} >{ code } -- {diagnoses[code].name}</li>
                ))
              }
            </ul> : null }
            <Icon style={{marginLeft:"1rem"}} color={healthIconColors[entry.healthCheckRating]} name="heart" />
        </Segment.Group>
      );
    case 'Hospital':
      return (
        <Segment.Group style={{paddingBottom:"1rem"}} >
          <Grid padded ><Grid.Column>
            <Header as="h4" content={entry.date} icon="hospital outline" />
          </Grid.Column></Grid>
          <p style={{marginLeft:"1rem"}}>{entry.description}</p>
          { entry.diagnosisCodes && entry.diagnosisCodes.length ?
            <ul> <b>Diagnosis Code - Description</b>
              {
                entry.diagnosisCodes.map((code: Diagnosis['code'], i: number) => (
                  <li key={i} >{ code } -- {diagnoses[code].name}</li>
                ))
              }
            </ul> : null }
        </Segment.Group>
      );
    case 'OccupationalHealthcare':
      return (
        <Segment.Group style={{paddingBottom:"1rem"}} >
          <Grid padded ><Grid.Column>
            <Header as="h4" content={`${entry.date} ${entry.employerName}`} icon="stethoscope" />
          </Grid.Column></Grid>
          <p style={{marginLeft:"1rem"}}>{entry.description}</p>
          { entry.diagnosisCodes && entry.diagnosisCodes.length ?
            <ul> <b>Diagnosis Code - Description</b>
              {
                entry.diagnosisCodes.map((code: Diagnosis['code'], i: number) => (
                  <li key={i} >{ code } -- {diagnoses[code].name}</li>
                ))
              }
            </ul> : null }
        </Segment.Group>
      );
    default:
      return assertNever(entry);
  }
  
};

export default EntryDetails;
