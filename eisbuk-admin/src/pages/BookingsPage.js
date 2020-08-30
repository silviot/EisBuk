import React from "react"
import Copyright from "../components/Copyright"
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AppbarDrawer from '../components/AppbarDrawer'
import { Typography } from "@material-ui/core";

import AddBookingSlot from '../components/AddBookingSlot'
import BookingCard from "../components/BookingCard";

const BookingsPage = () => {
  const classes = useStyles();
  useFirestoreConnect([
    { collection: 'bookings' }
  ])
  const bookings = useSelector((state) => state.firestore.ordered.bookings)
  return (
    <div className={classes.root}>
      <AppbarDrawer />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h1">Prenotazioni</Typography>
              <AddBookingSlot />
            </Grid>
              {
                bookings && bookings.map((booking) => (
                  <>
                  <Grid item xs={12}>
                    <BookingCard key={booking.id} {...booking} />
                  </Grid>
                  </>
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