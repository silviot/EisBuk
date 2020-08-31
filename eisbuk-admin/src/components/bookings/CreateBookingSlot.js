import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Button } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from '@material-ui/core/Typography'
import {
    DatePicker,
    TimePicker,
  } from '@material-ui/pickers';

import moment from 'moment'

import {createBookingSlot} from '../../store/actions/actions'

const getDefaultDuration = (duration) => {
    return new Date('August 31, 2020 00:'+duration+':00')
}

const CreateBookingSlot = ({createBookingSlot}) => {
    const inputProps = {
        step: 300,
    };
    const [dateTime, setDateTime] = useState( moment().startOf('hour').toDate() )
    const [duration, setDuration] = useState(getDefaultDuration( 50 ))

    const handleSubmit = (e) => {
        e.preventDefault()
        createBookingSlot({
            dateTime: moment(dateTime).toDate(),
            duration: moment(duration).minutes().toString()
        })
    }

    return (

        <Grid container m={0} p={0} spacing={0}>
            <Grid item xs={12}>
                <Paper elevation={3}>
                <form onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item xs={12} md={5}>
                            <DatePicker
                                id="booking-day"
                                name="booking-day"
    /*                             autoOk */
                                orientation="landscape"
                                variant="static"
                                openTo="date"
                                value={dateTime}
                                onChange={setDateTime}
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <TimePicker
                                id="booking-time"
                                name="booking-time" 
                                variant="static"
                                orientation="landscape"
                                openTo="hours"
                                ampm={false}
                                minutesStep={5}
                                value={dateTime}
                                onChange={setDateTime}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        Durata
                                    </Typography>
                                    <TimePicker 
                                        name="booking-duration"
                                        id="booking-duration" 
                                        inputVariant="outlined"
                                        variant="dialog"
                                        views={["minutes"]}
                                        format="mm"
                                        orientation="landscape"
                                        openTo="minutes"
                                        minutesStep={5}
                                        ampm={false}
                                        value={duration}
                                        onChange={setDuration}
                                    />
                                </Grid>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Minuti
                                </Typography>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained">
                                        Aggiungi Slot
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    </form>
                </Paper>
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