import React from "react";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { fs2luxon } from "../../../utils/helpers";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  TextField,
} from "@material-ui/core";
import { RadioGroup } from "formik-material-ui";
import {
  Formik,
  Form,
  Field,
  useField,
  ErrorMessage,
  useFormikContext,
} from "formik";
import { slotsLabelsLists } from "../../../config/appConfig";
import { DateTime } from "luxon";
import * as Yup from "yup";

const Timestamp = firebase.firestore.Timestamp;

const defaultValues = {
  time: "08:00",
  durations: ["60"],
  categories: [],
  type: "",
  notes: "",
};
const SlotValidation = Yup.object().shape({
  time: Yup.string().required("Manca l'ora"),
  categories: Yup.array()
    .of(Yup.string().min(1))
    .required("Scegli almeno una categoria"),
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
  const useStyles = makeStyles((theme) => ({
    root: {
      whiteSpace: "nowrap",
    },
  }));
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <IconButton color="primary" onClick={decrease}>
        -
      </IconButton>
      <TextField {...props} />
      <IconButton color="primary" onClick={increase}>
        +
      </IconButton>
    </Box>
  );
};

const SlotForm = ({
  createSlot,
  editSlot,
  isoDate,
  open,
  onClose,
  onOpen,
  slotToEdit,
  ...props
}) => {
  const classes = useStyles();
  const lastTime = useSelector((state) => state.app.newSlotTime);
  const parsedDate = DateTime.fromISO(isoDate);
  let parsedSlotEditDate;
  if (lastTime != null) {
    defaultValues["time"] = fs2luxon(lastTime).toFormat("HH:mm");
  }
  if (slotToEdit) {
    parsedSlotEditDate = fs2luxon(slotToEdit.date);
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <Formik
        initialValues={{ ...defaultValues, ...slotToEdit }}
        validationSchema={SlotValidation}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const parsed = DateTime.fromISO(isoDate + "T" + values.time);
          if (slotToEdit) {
            await editSlot({
              id: slotToEdit.id,
              type: values.type,
              categories: values.categories,
              durations: values.durations,
              notes: values.notes,
            });
          } else {
            await createSlot({
              type: values.type,
              categories: values.categories,
              durations: values.durations,
              date: Timestamp.fromDate(parsed.toJSDate()),
              notes: values.notes,
            });
          }
          setSubmitting(false);
          resetForm();
          onClose();
        }}
        {...props}
      >
        {({ errors, values, isSubmitting, isValidating }) => (
          <>
            <Form>
              <DialogTitle>
                {slotToEdit
                  ? parsedSlotEditDate.toFormat("EEEE d MMMM - HH:mm", {
                      locale: "it-IT",
                    })
                  : parsedDate.toFormat("EEEE d MMMM", { locale: "it-IT" })}
              </DialogTitle>
              <DialogContent>
                <FormControl component="fieldset">
                  {!slotToEdit && (
                    <>
                      <Field
                        name="time"
                        as={TimePickerField}
                        label="Ora di inizio"
                        className={classes.field}
                      />
                      <ErrorMessage name="time" />
                    </>
                  )}
                  <Box display="flex" flexWrap="wrap">
                    {getCheckBoxes("categories", slotsLabelsLists.categories)}
                  </Box>
                  <div className={classes.error}>
                    <ErrorMessage name="categories" />
                  </div>
                  <Field
                    component={RadioGroup}
                    name="type"
                    label="Tipo"
                    row
                    className={classes.field}
                  >
                    {getEnumItems(slotsLabelsLists.types)}
                  </Field>
                  <div className={classes.error}>
                    <ErrorMessage name="type" />
                  </div>
                  <Box display="flex">
                    {getCheckBoxes("durations", slotsLabelsLists.durations)}
                  </Box>

                  <Field
                    name="notes"
                    className={classes.field}
                    as={TextField}
                    label="Note"
                    multiline
                  />
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={onClose}>
                  Annulla
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={
                    !Object.keys(errors).length &&
                    (isSubmitting || isValidating)
                  }
                  color="primary"
                >
                  {slotToEdit ? "Modifica Slot" : "Crea Slot"}
                </Button>
              </DialogActions>
            </Form>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

const getEnumItems = (values) =>
  values.map((el) => (
    <FormControlLabel
      key={el.id}
      value={el.id}
      label={el.label}
      control={<Radio />}
    />
  ));

const getCheckBoxes = (name, values) =>
  values.map((el) => (
    <MyCheckbox
      key={el.id.toString()}
      name={name}
      value={name === "durations" ? el.id : el.id.toString()}
      label={el.label}
    />
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

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  error: {
    color: theme.palette.error.dark,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default SlotForm;
