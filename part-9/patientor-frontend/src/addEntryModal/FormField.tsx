import React, { Dispatch, SetStateAction } from "react";
import { Field, FieldProps, } from "formik";
import { Form } from "semantic-ui-react";
import { HealthCheckEntry, HospitalEntry, NewEntry, OccupationalHealthcareEntry } from "../types";

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
  onChange: Dispatch<SetStateAction<"HealthCheck" | "Hospital" | "OccupationalHealthcare">>;
  setInitialValues: Dispatch<SetStateAction<NewEntry>>;
  getInitialValues: () => NewEntry;
};

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  onChange,
  getInitialValues,
  setInitialValues
}: SelectFieldProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setType = (e: any): void => {
    onChange(e.target.value);
    setInitialValues(getInitialValues());
  };
  return (
    <Form.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown" onChange={setType}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
  );
};

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}
