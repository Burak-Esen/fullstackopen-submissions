import React from 'react';
import { useStateValue } from "../state";
import { Segment, Header, Grid, Button, Icon } from 'semantic-ui-react';
import { Entry, NewEntry } from '../types';
import { fetchPatient, submitNewEntry } from '../services';
import EntryDetails from './EntryDetails';
import AddEntryModal from '../addEntryModal';

interface Props {
  id: string;
}

const PatientDetails = ({ id }: Props) => {
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const newEntrySubmitHandler = (values: NewEntry) => {
    if (patient)
    try {
      submitNewEntry(patient,values,dispatch,closeModal);
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };
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
          <Grid.Row>
          <Grid.Column floated="left"  >
            <Header as='h3' content={ patient?.name }
              dividing={true}
              icon={patient?.gender === 'male' ? "mars" : "venus" }
            />
          </Grid.Column></Grid.Row>
          <Grid.Row>
            <Grid.Column floated="left"  >
              <Button onClick={() => openModal()} animated>
                <Button.Content visible>Add New Entry</Button.Content>
                <Button.Content hidden>
                  <Icon name='calendar plus' fitted size="large"/>
                </Button.Content>
              </Button>
            </Grid.Column>
          </Grid.Row>
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
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={newEntrySubmitHandler}
        error={error}
      />
    </Segment.Group>
  );
};

export default PatientDetails;
