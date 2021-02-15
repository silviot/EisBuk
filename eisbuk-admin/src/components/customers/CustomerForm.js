import React from "react";
import { makeStyles } from "@material-ui/styles";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  InputAdornment,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import { RadioGroup } from "formik-material-ui";
import {
  AccountCircle,
  Email,
  Phone,
  Cake,
  LocalHospital,
  Payment,
} from "@material-ui/icons";

import { Formik, Form, FastField } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";

import { slotsLabels } from "../../config/appConfig";

const CustomerValidation = Yup.object().shape({
  name: Yup.string().required("Richiesto"),
  surname: Yup.string().required("Richiesto"),
  email: Yup.string().email("Inserisci una email valida"),
  phone: Yup.string(),
  birth: Yup.mixed(),
  certificateExpiration: Yup.mixed(),
  category: Yup.string().required("Scegli la categoria"),
  subscriptionNumber: Yup.number(),
});

const CustomerForm = ({ open, handleClose, customer, updateCustomer }) => {
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
          birth: "",
          category: slotsLabels.categories[0].id,
          certificateExpiration: "",
          subscriptionNumber: "",
          ...customer,
        }}
        validationSchema={CustomerValidation}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          updateCustomer(values);
          setSubmitting(false);
          handleClose();
        }}
      >
        {({ submitForm, isSubmitting, errors }) => (
          <Form autoComplete="off">
            <DialogContent>
              <input
                type="hidden"
                name="id"
                value={(customer && customer.id) || ""}
              />
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

              <MyField
                component={RadioGroup}
                name="category"
                label="Categoria"
                row
                className={classes.radioGroup}
              >
                {slotsLabels.categories.map((level) => (
                  <FormControlLabel
                    key={level.id}
                    value={level.id}
                    label={level.label}
                    control={<Radio />}
                  />
                ))}
              </MyField>
              <FormHelperText>{errors.category}</FormHelperText>

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
                variant="contained"
                color="primary"
              >
                Salva
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

function MyField({ Icon, ...props }) {
  var InputProps = undefined;
  if (typeof Icon !== "undefined") {
    InputProps = {
      InputProps: {
        startAdornment: (
          <InputAdornment position="start">
            <Icon color="disabled" />
          </InputAdornment>
        ),
      },
    };
  }

  return (
    <FastField
      fullWidth
      autoComplete="off"
      {...{
        component: TextField,
        variant: "outlined",
        ...InputProps,
        ...props,
      }}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  radioGroup: {
    justifyContent: "space-evenly",
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
}));

export default CustomerForm;
