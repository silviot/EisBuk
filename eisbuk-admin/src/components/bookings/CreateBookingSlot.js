import React, {useState} from 'react'
import { connect } from 'react-redux'

import _ from 'lodash'

import { Button, duration } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { FormControlLabel } from "@material-ui/core";

import { Formik, Form, Field } from 'formik'
import { CheckboxWithLabel } from 'formik-material-ui'
import { DateTimePicker } from 'formik-material-ui-pickers';

import moment from 'moment'

import {createBookingSlot} from '../../store/actions/actions'

// Set slot durations choices
const durations = [20, 30, 50, 60, 90, 120]
const durationsState = durations.reduce((acc, val) => (acc[val]=false, acc), {})

// Set 50 as default duration choice
durationsState[50] = true

const CreateBookingSlot = ({createBookingSlot}) => {
return (
    <Grid container>
        <Grid item xs={12}>
            <Formik
                initialValues={{
                    ...durationsState,
                    dateTime: moment().startOf('hour').toDate()
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    createBookingSlot({
                        dateTime: moment(values.dateTime).toDate(),
                        duration: _.intersection(_.keys(_.pickBy(values), null, 2), durations.map((x) => x.toString() )),
                    })
                    setSubmitting(false)
                    resetForm()
/*                     alert(JSON.stringify(values))
                    setSubmitting(false) */
                }}
                >
                {({ submitForm, isSubmitting }) => (
                <Form>
                    <Field 
                        component={DateTimePicker}
                        variant="static"
                        label="Data e Ora"
                        name="dateTime"
                        type="date"
                        ampm={false}
                        autoOk
                    />
                    <Box p={3}>
                        <Typography variant="h4" align="center">Durata</Typography>
                        <Grid container>
                    {
                        durations.map((duration) => (
                        <Grid item xs={6}>
                            <FormControlLabel
                            label={`${duration} minuti`}
                            control={
                                <Field
                                id={duration}
                                name={duration}
                                type="checkbox"
                                component={CheckboxWithLabel}
                                />
                            }
                            />
                        </Grid>
                        ))
                    }
                        </Grid>
                    </Box>
                    <Box p={3}>
                        <Button type="submit" disabled={isSubmitting} variant="contained" color="primary" size="large" fullWidth>
                            Aggiungi Slot
                        </Button>
                    </Box>
                </Form>
                )}
            </Formik>
        </Grid>
    </Grid>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createBookingSlot: (data) => dispatch(createBookingSlot(data))
    }
}

export default connect(null, mapDispatchToProps)(CreateBookingSlot)