import React from "react";

import { Formik, Form, Field } from "formik";
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import * as Yup from "yup";

import moment from "moment";
import { Grid } from "@material-ui/core";

const SlotValidation = Yup.object().shape({
  date: Yup.date().required("Richiesto"),
  category: Yup.string().required("Scegli la categoria"),
  type: Yup.string().required("Scegli il tipo di allenamento"),
  durations: Yup.array()
    .of(Yup.number().min(1))
    .required("Devi scegliere almeno una durata"),
});

const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];

  return (
    <KeyboardDatePicker
      clearable
      disablePast
      name={field.name}
      value={field.value}
      format="dd/MM/yyyy"
      helperText={currentError}
      error={Boolean(currentError)}
      onError={(error) => {
        // handle as a side effect
        if (error !== currentError) {
          form.setFieldError(field.name, error);
        }
      }}
      // if you are using custom validation schema you probably want to pass `true` as third argument
      onChange={(date) => form.setFieldValue(field.name, date, false)}
      {...other}
    />
  );
};

const TimePickerField = ({ field, form, ...other }) => {
  /*   const currentError = form.errors[field.name]; */

  return (
    <KeyboardTimePicker
      label="Masked timepicker"
      placeholder="08:00 AM"
      mask="__:__ _M"
      value={field.value}
      onChange={(date) => form.setFieldValue(field.name, date, false)}
      {...other}
    />
  );
};

const SlotCreateForm = ({ action }) => {
  return (
    <Formik
      initialValues={{
        date: moment().startOf("hour").toDate(),
        durations: [60],
        category: "",
        type: "",
        notes: "",
      }}
      validationSchema={SlotValidation}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        alert(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ errors, values }) => (
        <Form>
          <Grid container>
            <Grid item container justify="center" xs={12}>
              <Field name="date" component={DatePickerField} />
            </Grid>
            <Grid item container justify="center" xs={12}>
              <Field name="date" component={TimePickerField} />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default SlotCreateForm;
