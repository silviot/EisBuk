import React from "react";

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

import {
  Formik,
  Form,
  Field,
  useField,
  ErrorMessage,
  useFormikContext,
} from "formik";
import { SlotCategory, SlotDuration, SlotType } from "../../../data/slots.js";
import { DateTime } from "luxon";
import * as Yup from "yup";

const defaultValues = {
  time: "08:00",
  durations: ["60"],
  category: "",
  type: "",
  notes: "",
};
const SlotValidation = Yup.object().shape({
  time: Yup.string().required("Manca l'ora"),
  category: Yup.string().required("Scegli la categoria"),
  type: Yup.string().required("Scegli il tipo di allenamento"),
  durations: Yup.array()
    .of(Yup.number().min(1))
    .required("Devi scegliere almeno una durata"),
});

const TimePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const getCurrentTime = (delta) => {
    const parsed = DateTime.fromISO(props.value);
    if (!parsed.invalid) {
      return parsed.plus({ hours: delta }).toISOTime().substring(0, 5);
    }
    return "08:00";
  };
  const decrease = () => setFieldValue(props.name, getCurrentTime(-1));
  const increase = () => setFieldValue(props.name, getCurrentTime(1));
  return (
    <Box>
      <Button variant="outlined" onClick={decrease}>
        -
      </Button>
      <TextField {...props} />
      <Button variant="outlined" onClick={increase}>
        +
      </Button>
    </Box>
  );
};

const SlotCreate = ({ createSlot, open, onClose, onOpen, ...props }) => {
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
            <DialogTitle>Aggiungi Slot</DialogTitle>
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
