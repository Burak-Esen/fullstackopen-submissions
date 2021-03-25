import React, { useState } from "react";
import { Grid, Button, Segment } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { SelectField, EntryTypeOption } from "./FormField";
import { TextField, DiagnosisSelection, NumberField } from '../AddPatientModal/FormField';
import { useStateValue } from "../state";
import { HealthCheckEntry, HospitalEntry, NewEntry, OccupationalHealthcareEntry } from "../types";


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
  const [entryType, setEntryType] = useState<'Hospital'|'HealthCheck'|'OccupationalHealthcare'>('Hospital');
  const baseInitialValues = {
    date:'',
    description:'',
    specialist:'',
    diagnosisCodes:[]
  };
  const getInitialValues = () => {
    switch (entryType) {
      case "HealthCheck":
        return {
          ...baseInitialValues,
          type: 'HealthCheck',
          healthCheckRating:0
        } as Omit<HealthCheckEntry, "id">;
      case "Hospital":
        return {
          ...baseInitialValues,
          type: "Hospital",
          discharge:{ criteria: '', date: ''}
        } as Omit<HospitalEntry, "id">;
      case "OccupationalHealthcare":
        return {
          ...baseInitialValues,
          type: "OccupationalHealthcare",
          employerName:'',
          sickLeave:{ startDate:'', endDate:'' }
        } as Omit<OccupationalHealthcareEntry, "id">;
    }
  };
  const [initialValues, setInitialValues] = useState(getInitialValues());
  return (
    <Formik
      initialValues={initialValues}
      onSubmit = {onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === 'HealthCheck' && !values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched  }) => {
        return (
          <Form className="form ui">
            <SelectField
              onChange={setEntryType}
              setInitialValues={setInitialValues}
              getInitialValues={getInitialValues}
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
            { entryType === "HealthCheck" &&
              <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            }
            { entryType === "Hospital" &&
              <Segment>
                Discharge:
                <Field 
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}/>
                <Field 
                  label="Criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </Segment>
            }
            { entryType === "OccupationalHealthcare" && [
              <Field key="0"
                label="Employer Name"
                placeholder="Name"
                name="employerName"
                component={TextField}
              />,
              <Segment key="1">
                Sick Enter/Leave Dates:
                <Field 
                  label="Enter Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}/>
                <Field 
                  label="Leave Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </Segment>
              ]
              }
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
