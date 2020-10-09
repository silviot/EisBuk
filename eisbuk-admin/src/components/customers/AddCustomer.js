import React from "react";
import { connect } from "react-redux";

import { Typography, Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";

import AccountCircle from "@material-ui/icons/AccountCircle";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
import Cake from "@material-ui/icons/Cake";
import LocalHospital from "@material-ui/icons/LocalHospital";
import Payment from "@material-ui/icons/Payment";
import Grade from "@material-ui/icons/Grade";

import { createCustomer } from "../../store/actions/actions";

import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import { DatePicker } from "formik-material-ui-pickers";
import * as Yup from "yup";

import moment from "moment";

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

const AddCustomer = ({ createCustomer }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper>
          <Box p={3}>
            <Typography variant="h3">Nuovo Atleta</Typography>
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
                  birth: moment(values.birth).toDate(),
                  category: values.category,
                  certificateExpiration: moment(
                    values.certificateExpiration
                  ).toDate(),
                  subscriptionNumber: values.subscriptionNumber,
                });
                setSubmitting(false);
                resetForm();
              }}
            >
              {({ submitForm, isSubmitting, errors }) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                      <Field
                        component={TextField}
                        name="name"
                        label="Nome"
                        variant="outlined"
                        fullWidth
                        inputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle color="disabled" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                      <Field
                        component={TextField}
                        name="surname"
                        label="Cognome"
                        variant="outlined"
                        fullWidth
                        inputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle color="disabled" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                      <Field
                        component={TextField}
                        name="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        inputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email color="disabled" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                      <Field
                        component={TextField}
                        name="phone"
                        label="Telefono"
                        variant="outlined"
                        fullWidth
                        inputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone color="disabled" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                      <Field
                        component={DatePicker}
                        name="birth"
                        label="Data di nascita"
                        variant="outlined"
                        openTo="year"
                        inputVariant="outlined"
                        views={["year", "month", "date"]}
                        format="D MMMM YYYY"
                        maxDate={moment()}
                        fullWidth
                        inputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Cake color="disabled" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Categoria</InputLabel>
                        <Field
                          component={Select}
                          name="category"
                          label="Categoria"
                          inputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Grade color="disabled" />
                              </InputAdornment>
                            ),
                          }}
                        >
                          {slotsLabels.categories.map((level) => (
                            <MenuItem key={level.id} value={level.id}>
                              {level.label}
                            </MenuItem>
                          ))}
                        </Field>
                        <FormHelperText>{errors.category}</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                      <Field
                        component={DatePicker}
                        name="certificateExpiration"
                        label="Scadenza Cert. Medico"
                        variant="outlined"
                        inputVariant="outlined"
                        views={["year", "month", "date"]}
                        format="D MMMM YYYY"
                        fullWidth
                        inputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocalHospital color="disabled" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                      <Field
                        component={TextField}
                        name="subscriptionNumber"
                        label="Numero Tessera"
                        variant="outlined"
                        fullWidth
                        inputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Payment color="disabled" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        disabled={isSubmitting}
                        onClick={submitForm}
                        variant="contained"
                        color="primary"
                      >
                        Aggiungi
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCustomer: (data) => dispatch(createCustomer(data)),
  };
};

export default connect(null, mapDispatchToProps)(AddCustomer);