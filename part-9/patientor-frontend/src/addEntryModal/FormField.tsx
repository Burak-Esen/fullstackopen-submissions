import React from "react";
import { Field, FieldProps, } from "formik";
import { Form } from "semantic-ui-react";
import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";

// structure of a single option
export type EntryTypeOption = {
  value: HealthCheckEntry['type'] | HospitalEntry['type'] | OccupationalHealthcareEntry['type'];
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: EntryTypeOption[];
};

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options
}: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}
