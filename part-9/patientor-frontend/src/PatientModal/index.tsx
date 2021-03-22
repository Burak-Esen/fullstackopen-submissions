import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Modal } from 'semantic-ui-react';
import PatientDetails from './PatientDetails';

//import AddPatientForm, from './AddPatientForm';

const PatientModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const onClose = () => {
    setModalOpen(false);
    history.push('/');
  };
  const { id } = useParams<{ id: string}>();
  useEffect(()=> setModalOpen(true), []);
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Patient Details</Modal.Header>
      <Modal.Content>
        <PatientDetails id={id} />
      </Modal.Content>
    </Modal>
  );
};

export default PatientModal;
