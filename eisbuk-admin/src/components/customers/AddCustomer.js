import React from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
} from "@material-ui/core";

import {
  AccountCircle,
  Email,
  Phone,
  Cake,
  LocalHospital,
  Payment,
} from "@material-ui/icons";

import { createCustomer } from "../../store/actions/actions";

import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import * as Yup from "yup";

import { slotsLabels } from "../../config/appConfig";

const CustomerValidation = Yup.object().shape({
  name: Yup.string().required("Richiesto"),
  surname: Yup.string().required("Richiesto"),
  email: Yup.string().email("Inserisci una email valida").required("Richiesto"),
  phone: Yup.number("Inserisci un numero").required("Richiesto"),
  birth: Yup.mixed().required("Richiesto"),
  certificateExpiration: Yup.mixed("Non è una data").required("Richiesto"),
  category: Yup.string().required("Scegli la categoria"),
  subscriptionNumber: Yup.number().required("Richiesto"),
});

const AddCustomer = ({ open, handleClose, createCustomer }) => {
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Nuovo atleta</DialogTitle>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          email: "",
          phone: "",
          birth: null,
          category: "",
          certificateExpiration: null,
          subscriptionNumber: "",
        }}
        validationSchema={CustomerValidation}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          createCustomer({
            name: values.name,
            surname: values.surname,
            email: values.email,
            phone: values.phone,
            birth: values.birth,
            category: values.category,
            certificateExpiration: values.certificateExpiration,
            subscriptionNumber: values.subscriptionNumber,
          });
          setSubmitting(false);
          resetForm();
          handleClose();
        }}
      >
        {({ submitForm, isSubmitting, errors }) => (
          <Form>
            <DialogContent>
              <Field
                className={classes.field}
                component={TextField}
                name="name"
                label="Nome"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle color="disabled" />
                    </InputAdornment>
                  ),
                }}
              />
              <Field
                className={classes.field}
                component={TextField}
                name="surname"
                label="Cognome"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle color="disabled" />
                    </InputAdornment>
                  ),
                }}
              />
              <Field
                component={TextField}
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                className={classes.field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="disabled" />
                    </InputAdornment>
                  ),
                }}
              />
              <Field
                component={TextField}
                name="phone"
                label="Telefono"
                variant="outlined"
                fullWidth
                className={classes.field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="disabled" />
                    </InputAdornment>
                  ),
                }}
              />
              <Field
                component={TextField}
                name="birth"
                type="date"
                label="Data di nascita"
                variant="outlined"
                views={["year", "month", "date"]}
                fullWidth
                className={classes.field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Cake color="disabled" />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl
                variant="outlined"
                className={classes.field}
                fullWidth
              >
                <InputLabel>Categoria</InputLabel>
                <Field component={Select} name="category" label="Categoria">
                  {slotsLabels.categories.map((level) => (
                    <MenuItem key={level.id} value={level.id}>
                      {level.label}
                    </MenuItem>
                  ))}
                </Field>
                <FormHelperText>{errors.category}</FormHelperText>
              </FormControl>
              <Field
                component={TextField}
                type="date"
                name="certificateExpiration"
                label="Scadenza Cert. Medico"
                variant="outlined"
                className={classes.field}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalHospital color="disabled" />
                    </InputAdornment>
                  ),
                }}
              />
              <Field
                component={TextField}
                name="subscriptionNumber"
                label="Numero Tessera"
                className={classes.field}
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Payment color="disabled" />
                    </InputAdornment>
                  ),
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Annulla
              </Button>
              <Button
                disabled={isSubmitting}
                onClick={submitForm}
                variant="contained"
                color="primary"
              >
                Aggiungi
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: theme.spacing(1),
  },
}));

const mapDispatchToProps = (dispatch) => {
  return {
    createCustomer: (data) => dispatch(createCustomer(data)),
  };
};

export default connect(null, mapDispatchToProps)(AddCustomer);
