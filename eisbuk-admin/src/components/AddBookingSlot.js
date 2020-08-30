import React, {useState} from 'react'

import { Typography, Box } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    Calendar
  } from '@material-ui/pickers';
  import MomentUtils from "@date-io/moment";
import moment from 'moment'
import CustomerList from './CustomerList'

const AddBookingSlot = () => {
    const inputProps = {
        step: 300,
    };
    const [selectedDate, handleDateChange] = useState(moment());
    return (

        <Grid container m={0} p={0} spacing={0}>
            <Grid item xs={12}>
                <Paper elevation={3}>
                    <Grid container>
                        <DatePicker
                            autoOk
                            orientation="landscape"
                            variant="static"
                            openTo="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </Grid>
{/*                             <Calendar date={selectedDate} onChange={handleDateChange} />
*/} 
                </Paper>
            </Grid>
        </Grid>

    )
}

export default AddBookingSlot