import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Typography, Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Slider from "@material-ui/core/Slider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import { createCustomer } from "../../store/actions/actions";

import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";

const defaultValues = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  subscription: "standard",
};

const AddCustomer = ({ createCustomer }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper>
          <Box p={3}>
            <Typography variant="h3">Nuovo cliente</Typography>
            <Formik
              initialValues={{
                name: "",
                surname: "",
                email: "",
                phone: "",
                subscription: "standard",
                level: "5",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                    values.email
                  )
                ) {
                  errors.email = "Invalid email address";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                createCustomer(values);
                setSubmitting(false);
                resetForm();
              }}
            >
              {({ submitForm, isSubmitting, setFieldValue }) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                      <Field
                        required
                        component={TextField}
                        name="name"
                        label="Nome"
                        defaultValue=""
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                      <Field
                        required
                        component={TextField}
                        name="surname"
                        label="Cognome"
                        defaultValue=""
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                      <Field
                        required
                        component={TextField}
                        name="email"
                        type="email"
                        label="Email"
                        defaultValue=""
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                      <Field
                        required
                        component={TextField}
                        name="phone"
                        type="tel"
                        label="Telefono"
                        defaultValue=""
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">
                          Abbonamento
                        </InputLabel>
                        <Field
                          component={Select}
                          name="subscription"
                          labelId="subscription-type"
                          label="Abbonamento"
                        >
                          <MenuItem value="standard">Standard</MenuItem>
                          <MenuItem value="professional">Professional</MenuItem>
                        </Field>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <Typography gutterBottom>Livello</Typography>
                      <Slider
                        defaultValue={5}
                        valueLabelDisplay="auto"
                        step={1}
                        min={1}
                        max={10}
                        valueLabelDisplay="on"
                        onChange={(event, value) =>
                          setFieldValue("level", value)
                        }
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
