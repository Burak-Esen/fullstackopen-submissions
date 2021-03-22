import React from 'react';
import { Modal } from 'semantic-ui-react';
import PatientDetails from './PatientDetails';

//import AddPatientForm, from './AddPatientForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  patid: string;
}

const PatientModal = ({ modalOpen, onClose, patid }: Props) => {
  
  
  return (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Patient Details</Modal.Header>
    <Modal.Content>
      <PatientDetails id={patid} />
    </Modal.Content>
  </Modal>
  );
};

export default PatientModal;
