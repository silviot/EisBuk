import React from "react";

import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

import { Formik, Form, Field, useField, ErrorMessage } from "formik";
import { SlotCategory, SlotDuration, SlotType } from "../../../data/slots.js";

import * as Yup from "yup";

const defaultValues = {
  time: "08:00",
  durations: ["60"],
  category: "",
  type: "",
  notes: "",
};
const SlotValidation = Yup.object().shape({
  time: Yup.date().required("Manca l'ora"),
  category: Yup.string().required("Scegli la categoria"),
  type: Yup.string().required("Scegli il tipo di allenamento"),
  durations: Yup.array()
    .of(Yup.number().min(1))
    .required("Devi scegliere almeno una durata"),
});

const TimePickerField = ({ ...props }) => {
  return <TextField {...props} />;
};

const SlotCreate = ({ createSlot, open, onClose, onOpen, ...props }) => {
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={onClose}>
      <Formik
        initialValues={{ ...props.initialValues, ...defaultValues }}
        validationSchema={SlotValidation}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await createSlot(values);
          setSubmitting(false);
          resetForm();
          onClose();
        }}
        {...props}
      >
        {({ errors, values, isSubmitting, isValidating }) => (
          <>
            <DialogTitle className={classes.drawerTitle}>
              Aggiungi Slot
            </DialogTitle>
            <DialogContent>
              <Form>
                <FormControl component="fieldset">
                  <Field
                    name="time"
                    as={TimePickerField}
                    label="Ora di inizio"
                  />
                  <ErrorMessage name="time" />

                  <Field
                    as={TextField}
                    name="category"
                    label="Categoria"
                    select
                  >
                    {getEnumItems(SlotCategory)}
                  </Field>
                  <ErrorMessage name="category" />

                  <Field as={TextField} name="type" label="Tipo" select>
                    {getEnumItems(SlotType)}
                  </Field>
                  <ErrorMessage name="type" />

                  {getCheckBoxes("durations", SlotDuration)}

                  <Field name="notes" as={TextField} label="Note" multiline />
                </FormControl>
              </Form>
            </DialogContent>
            <DialogActions>
              <Button color="primary">Annulla</Button>
              <Button
                disabled={
                  !Object.keys(errors).length && (isSubmitting || isValidating)
                }
                color="primary"
              >
                Crea slot
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({}));

const getEnumItems = (values) =>
  Object.keys(values).map((el) => <MenuItem value={values[el]}>{el}</MenuItem>);

const getCheckBoxes = (name, values) =>
  Object.keys(values).map((el) => (
    <MyCheckbox name={name} value={values[el]} label={el} />
  ));

export function MyCheckbox({ name, value, label }) {
  const [field] = useField({
    name: name,
    type: "checkbox",
    value: value,
  });
  return (
    <FormControlLabel
      control={<Checkbox {...{ name, value }} {...field} />}
      label={label}
    />
  );
}
export default SlotCreate;
