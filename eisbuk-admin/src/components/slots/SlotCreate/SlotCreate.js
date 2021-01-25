import React from "react";

import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  TextField,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const defaultValues = {
  time: "08:00",
  durations: [60],
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
  return <TextField {...props} />;
};

const SlotCreate = ({ createSlot, open, onClose, onOpen, ...props }) => {
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={onClose}>
      <Formik
        initialValues={{ ...props.initialValues, defaultValues }}
        validationSchema={SlotValidation}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await createSlot(values);
          setSubmitting(false);
          resetForm();
          onClose();
        }}
        {...props}
      >
        {({ errors, values, isSubmitting, isValidating }) => {
          return (
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
                    <Field name="category" as={TextField} label="Categoria" />
                    <Field name="type" as={TextField} label="Tipo" />
                    <Field name="notes" as={TextField} label="Note" multiline />
                  </FormControl>
                </Form>
                <pre>
                  {JSON.stringify(
                    { errors, values, isSubmitting, isValidating },
                    null,
                    2
                  )}
                </pre>
              </DialogContent>
              <DialogActions>
                <Button color="primary">Annulla</Button>
                <Button
                  disabled={
                    !Object.keys(errors).length &&
                    (isSubmitting || isValidating)
                  }
                  color="primary"
                >
                  Crea slot
                </Button>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({}));

export default SlotCreate;
