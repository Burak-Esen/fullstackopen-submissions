import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { SelectField, EntryTypeOption } from "./FormField";
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { NewEntry } from "../types";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: 'Hospital', label: "Hospital" },
  { value: 'HealthCheck', label: "Health Check" },
  { value: 'OccupationalHealthcare', label: "Occupational Healthcare" }
];

export const AddPatientForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: 'Hospital',
        date: '',
        description: '',
        specialist: '',
        diagnosisCodes: []
      }}
      onSubmit = {onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.name = requiredError;
        }
        if (!values.description) {
          errors.ssn = requiredError;
        }
        if (!values.specialist) {
          errors.dateOfBirth = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched  }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Entry Type"
              name="entryType"
              options={entryTypeOptions}
            />
            <Field
              label="Name of Specialist"
              placeholder="Name"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={3}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={3}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientForm;
