import React from "react";

import { Button, SwipeableDrawer, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

import { Formik, Form, Field, FieldArray } from "formik";
import { CheckboxWithLabel, Select, TextField } from "formik-material-ui";
import { DateTimePicker } from "formik-material-ui-pickers";
import * as Yup from "yup";

import moment from "moment";
import { slotsLabels } from "../../../config/appConfig";

const SlotValidation = Yup.object().shape({
  date: Yup.date().required("Richiesto"),
  category: Yup.string().required("Scegli la categoria"),
  type: Yup.string().required("Scegli il tipo di allenamento"),
  durations: Yup.array()
    .of(Yup.number().min(1))
    .required("Devi scegliere almeno una durata"),
});

const SlotCreate = ({ createSlot, open, onClose, onOpen }) => {
  const classes = useStyles();
  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Box width={310}>
        <Typography className={classes.drawerTitle} variant="h2">
          Aggiungi Slot
        </Typography>
        <Grid container>
          <Grid item xs={12}>
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
                createSlot({
                  date: moment(values.date).toDate(),
                  durations: values.durations,
                  category: values.category,
                  type: values.type,
                  notes: values.notes,
                });
                setSubmitting(false);
                resetForm();
                onClose();
              }}
            >
              {({ errors, values }) => (
                <Form>
                  <Field
                    component={DateTimePicker}
                    variant="static"
                    label="Data e Ora"
                    name="date"
                    ampm={false}
                    autoOk
                  />
                  <Box px={6} pb={3}>
                    <Grid container>
                      <FormHelperText>{errors.durations}</FormHelperText>
                      <FieldArray
                        name="durations"
                        render={(arrayHelpers) =>
                          slotsLabels.durations.map((duration) => (
                            <Grid item xs={12} key={duration.id}>
                              <FormControlLabel
                                label={duration.label}
                                variant="contained"
                                control={
                                  <Field
                                    name="durations"
                                    type="checkbox"
                                    component={CheckboxWithLabel}
                                    value={duration.id}
                                    checked={values.durations.includes(
                                      duration.id
                                    )}
                                    onChange={(e) => {
                                      if (e.target.checked)
                                        arrayHelpers.push(duration.id);
                                      else {
                                        const idx = values.durations.indexOf(
                                          duration.id
                                        );
                                        arrayHelpers.remove(idx);
                                      }
                                    }}
                                  />
                                }
                              />
                            </Grid>
                          ))
                        }
                      />
                    </Grid>
                  </Box>
                  <Box px={3}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Categoria</InputLabel>
                      <Field
                        component={Select}
                        name="category"
                        label="Categoria"
                      >
                        {slotsLabels.categories.map((level) => (
                          <MenuItem key={level.id} value={level.id}>
                            {level.label}
                          </MenuItem>
                        ))}
                      </Field>
                      <FormHelperText>{errors.category}</FormHelperText>
                    </FormControl>
                  </Box>
                  <Box p={3}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Tipo di allenamento</InputLabel>
                      <Field
                        component={Select}
                        name="type"
                        label="Tipo di allenamento"
                      >
                        {slotsLabels.types.map((level) => (
                          <MenuItem key={level.id} value={level.id}>
                            {level.label}
                          </MenuItem>
                        ))}
                      </Field>
                      <FormHelperText>{errors.type}</FormHelperText>
                    </FormControl>
                  </Box>
                  <Box px={3}>
                    <Field
                      component={TextField}
                      label="Note"
                      name="notes"
                      variant="outlined"
                      multiline
                      fullWidth
                      rows={4}
                    />
                  </Box>
                  <Box p={3}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                    >
                      Aggiungi Slot
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </SwipeableDrawer>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  headerHero: {
    backgroundColor: theme.palette.secondary.main,
  },
  pageTitle: {
    color: theme.palette.secondary.contrastText,
  },
  actions: {
    "& button": {
      marginLeft: theme.spacing(2),
    },
  },
  mainCalendar: {
    margin: theme.spacing(3),
  },
  dayHeadingContainer: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(3),
  },
  dayHeading: {
    textTransform: "uppercase",
    textAlign: "center",
    padding: 0,
  },
  slotsContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  drawerTitle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    fontSize: "2rem",
    padding: theme.spacing(3),
  },
}));

export default SlotCreate;
