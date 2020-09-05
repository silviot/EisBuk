import React, { useState } from "react"
import Copyright from "../components/layout/Copyright"
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AppbarDrawer from '../components/layout/AppbarDrawer'
import { Typography, Badge } from "@material-ui/core";
import {
  DatePicker,
  Day,
} from '@material-ui/pickers';

import CreateBookingSlot from '../components/bookings/CreateBookingSlot'
import BookingCard from "../components/bookings/BookingCard";

import moment from 'moment' 
import { onlyUnique } from '../utils/helpers'


const BookingsPage = () => {
  let m = (m) => moment(m).locale('it')
  const classes = useStyles();

  const [date, setDate] = useState({
    start: m().startOf('day').toDate(),
    end: m().add(1,'days').startOf('day').toDate(),
    current: m().toDate()
  })

  const handleDateChange = (date) => {
    setDate({
      start: m(date).startOf('day').toDate(),
      end: m(date).add(1,'days').startOf('day').toDate(),
      current: m(date).toDate()
    })
  }

  const [month, setMonth] = useState({
    start: m().startOf('month').toDate(),
    end: m().add(1,'months').startOf('month').toDate(),
  })

  const handleMonthChange = (date) => {
    setMonth({
      start: m(date).toDate(),
      end: m(date).add(1,'month').startOf('month').toDate(),
    })
  }

  useFirestoreConnect([
    { 
      collection: 'bookings', 
      orderBy: 'date',
      where: [
        ['date', '>=', date.start],
        ['date', '<', date.end],
      ]
    },
    { 
      collection: 'bookings', 
      orderBy: 'date',
      where: [
        ['date', '>=', month.start],
        ['date', '<', month.end],
      ],
      storeAs: 'bookingsByMonth'
    }
  ])

  const bookings = useSelector((state) => state.firestore.ordered.bookings)
  const bookingsByMonth = useSelector((state) => state.firestore.ordered.bookingsByMonth)
  const daysInMonth = bookingsByMonth && [...bookingsByMonth.map(x => moment.unix(x.date.seconds).format('D'))]

  return (
    <div className={classes.root}>
      <AppbarDrawer />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h1">Prenotazioni</Typography>
              <Grid container spacing={0}>
                <Grid item xs={12} md={5}>
                  <DatePicker
                    id="booking-day"
                    name="booking-day"
                    orientation="landscape"
                    variant="static"
                    openTo="date"
                    value={date.current}
                    onChange={(date) => {
                      handleDateChange(date)
                    }}
                    onMonthChange={ (date) => {
                      handleMonthChange(date)
                    }}
                    renderDay={ (day, selectedDate, isInCurrentMonth, dayComponent) => {
                      const date = moment(day ?? null)
                      const isSelected = daysInMonth && daysInMonth.filter(onlyUnique).includes(moment(date).format('D'))
                      return (
                        <Day style={{border: isSelected ? '1px solid' : 'none'}}>{dayComponent}</Day>
                      )
                    } }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs ={12}>
              <CreateBookingSlot />
            </Grid>
              {
                bookings && bookings.map((booking) => (
                  <Grid item xs={12} key={booking.id} >
                    <BookingCard {...booking} />
                  </Grid>
                  )
                )
              }
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

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
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default BookingsPage