import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";

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

import { Formik, Form, FastField } from "formik";
import { TextField, Select } from "formik-material-ui";
import * as Yup from "yup";

import { slotsLabels } from "../../config/appConfig";

const CustomerValidation = Yup.object().shape({
  name: Yup.string().required("Richiesto"),
  surname: Yup.string().required("Richiesto"),
  email: Yup.string().email("Inserisci una email valida"),
  phone: Yup.number("Inserisci un numero"),
  birth: Yup.mixed(),
  certificateExpiration: Yup.mixed("Non è una data"),
  category: Yup.string().required("Scegli la categoria"),
  subscriptionNumber: Yup.number(),
});

const CustomerForm = ({ open, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Nuovo atleta</DialogTitle>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          email: "",
          phone: "",
          birth: "",
          category: slotsLabels.categories[0].id,
          certificateExpiration: "",
          subscriptionNumber: "",
        }}
        validationSchema={CustomerValidation}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(
            createCustomer({
              name: values.name,
              surname: values.surname,
              email: values.email,
              phone: values.phone,
              birth: values.birth,
              category: values.category,
              certificateExpiration: values.certificateExpiration,
              subscriptionNumber: values.subscriptionNumber,
            })
          );
          setSubmitting(false);
          resetForm();
          handleClose();
        }}
      >
        {({ submitForm, isSubmitting, errors }) => (
          <Form autoComplete="off">
            <DialogContent>
              <MyField
                className={classes.field}
                name="name"
                label="Nome"
                Icon={AccountCircle}
              />
              <MyField
                className={classes.field}
                name="surname"
                label="Cognome"
                Icon={AccountCircle}
              />
              <MyField
                name="email"
                label="Email"
                className={classes.field}
                Icon={Email}
              />
              <MyField
                name="phone"
                label="Telefono"
                className={classes.field}
                Icon={Phone}
              />
              <MyField
                name="birth"
                type="date"
                label="Data di nascita"
                views={["year", "month", "date"]}
                className={classes.field}
                Icon={Cake}
              />
              <FormControl className={classes.field} fullWidth>
                <InputLabel>Categoria</InputLabel>
                <MyField component={Select} name="category" label="Categoria">
                  {slotsLabels.categories.map((level) => (
                    <MenuItem key={level.id} value={level.id}>
                      {level.label}
                    </MenuItem>
                  ))}
                </MyField>
                <FormHelperText>{errors.category}</FormHelperText>
              </FormControl>
              <MyField
                type="date"
                name="certificateExpiration"
                label="Scadenza Cert. Medico"
                className={classes.field}
                Icon={LocalHospital}
              />
              <MyField
                name="subscriptionNumber"
                label="Numero Tessera"
                className={classes.field}
                Icon={Payment}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Annulla
              </Button>
              <Button
                type="submit"
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

function MyField({ Icon, ...props }) {
  const InputProps = {};
  if (typeof Icon !== "undefined") {
    InputProps.startAdornment = (
      <InputAdornment position="start">
        <Icon color="disabled" />
      </InputAdornment>
    );
  }

  return (
    <FastField
      fullWidth
      autoComplete="off"
      {...{
        component: TextField,
        variant: "outlined",
        InputProps: InputProps,
        ...props,
      }}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: theme.spacing(1),
  },
}));

export default CustomerForm;
