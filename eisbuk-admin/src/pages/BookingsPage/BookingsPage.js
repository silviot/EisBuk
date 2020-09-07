import React, { useState } from "react";
import Copyright from "../../components/layout/Copyright";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AppbarDrawer from "../../components/layout/AppbarDrawer";
import { Typography, Button, Paper } from "@material-ui/core";
import { DatePicker, Day } from "@material-ui/pickers";
import LinearProgress from "@material-ui/core/LinearProgress";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import EventAvailable from "@material-ui/icons/EventAvailable";
import DynamicFeed from "@material-ui/icons/DynamicFeed";

import CreateBookingSlot from "../../components/bookings/CreateBookingSlot";
import BookingCard from "../../components/bookings/BookingCard";

import moment from "moment";
import { onlyUnique } from "../../utils/helpers";

const BookingsPage = () => {
  let m = (m) => moment(m).locale("it");
  const classes = useStyles();
  const [date, setDate] = useState({
    start: m().startOf("day").toDate(),
    end: m().add(1, "days").startOf("day").toDate(),
    current: m().toDate(),
  });
  const [month, setMonth] = useState({
    start: m().startOf("month").toDate(),
    end: m().add(1, "months").startOf("month").toDate(),
  });
  const [openCreateBooking, setOpenCreateBooking] = useState(false);

  const handleDateChange = (date) => {
    setDate({
      start: m(date).startOf("day").toDate(),
      end: m(date).add(1, "days").startOf("day").toDate(),
      current: m(date).toDate(),
    });
  };

  const handleMonthChange = (date) => {
    setMonth({
      start: m(date).toDate(),
      end: m(date).add(1, "month").startOf("month").toDate(),
    });
  };

  const handleOpenCreateBooking = () => {
    setOpenCreateBooking(true);
  };
  const handleCloseCreateBooking = () => {
    setOpenCreateBooking(false);
  };

  useFirestoreConnect([
    {
      collection: "bookings",
      orderBy: "date",
      where: [
        ["date", ">=", date.start],
        ["date", "<", date.end],
      ],
    },
    {
      collection: "bookings",
      orderBy: "date",
      where: [
        ["date", ">=", month.start],
        ["date", "<", month.end],
      ],
      storeAs: "bookingsByMonth",
    },
  ]);

  const bookings = useSelector((state) => state.firestore.ordered.bookings);
  const bookingsByMonth = useSelector(
    (state) => state.firestore.ordered.bookingsByMonth
  );
  let daysInMonth = bookingsByMonth && [
    ...bookingsByMonth.map((x) => moment.unix(x.date.seconds).format("D")),
  ];

  return (
    <div className={classes.root}>
      <AppbarDrawer />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Grid container className={classes.headerHero}>
          <Container maxWidth="lg">
            <Grid item xs={12}>
              <Typography variant="h1" className={classes.pageTitle}>
                Prenotazioni
              </Typography>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} md={6}>
                  <Box py={6}>
                    <Paper elevation={6}>
                      <DatePicker
                        id="booking-day"
                        className={classes.mainCalendar}
                        name="booking-day"
                        orientation="landscape"
                        variant="static"
                        openTo="date"
                        value={date.current}
                        onChange={(date) => {
                          handleDateChange(date);
                        }}
                        onMonthChange={(date) => {
                          daysInMonth = [];
                          handleMonthChange(date);
                        }}
                        renderDay={(
                          day,
                          selectedDate,
                          isInCurrentMonth,
                          dayComponent
                        ) => {
                          const date = moment(day ?? null);
                          const isSelected =
                            daysInMonth &&
                            daysInMonth
                              .filter(onlyUnique)
                              .includes(moment(date).format("D"));
                          return (
                            <Day
                              style={{
                                border: isSelected ? "1px solid" : "none",
                              }}
                            >
                              {dayComponent}
                            </Day>
                          );
                        }}
                      />
                    </Paper>
                  </Box>
                </Grid>
                <Grid
                  className={classes.actions}
                  item
                  xs={12}
                  md={6}
                  align="center"
                >
                  <Button
                    onClick={handleOpenCreateBooking}
                    variant="contained"
                    size="large"
                    color="primary"
                    startIcon={<EventAvailable />}
                  >
                    Nuovo Slot
                  </Button>
                  {/* <Dialog open={openCreateBooking} onClose={handleCloseCreateBooking} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      <CreateBookingSlot />
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseCreateBooking} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleCloseCreateBooking} color="primary">
                      Subscribe
                    </Button>
                  </DialogActions>
                </Dialog> */}
                  <SwipeableDrawer
                    anchor="right"
                    open={openCreateBooking}
                    onClose={handleCloseCreateBooking}
                    onOpen={handleOpenCreateBooking}
                    className={classes.drawer}
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                  >
                    <Box width={310}>
                      <Typography className={classes.drawerTitle} variant="h2">
                        Aggiungi Slot
                      </Typography>
                      <CreateBookingSlot />
                    </Box>
                  </SwipeableDrawer>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    startIcon={<DynamicFeed />}
                  >
                    Copia da altro giorno
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid container className={classes.dayHeadingContainer}>
          <Grid item xs={12}>
            <Container max-width="xl">
              <Grid container>
                <Grid item xs={12}>
                  <Typography className={classes.dayHeading} variant="h2">
                    {m(date.current).format("dddd D MMMM YYYY")}
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
        {!isLoaded(bookings) && <LinearProgress />}
        <Container maxWidth="md" className={classes.slotsContainer}>
          <Grid container spacing={3}>
            {isLoaded(bookings) &&
              !isEmpty(bookings) &&
              bookings.map((booking) => (
                <Grid item xs={12} key={booking.id}>
                  <BookingCard {...booking} />
                </Grid>
              ))}
            {isLoaded(bookings) && isEmpty(bookings) && (
              <Grid item xs={12} p={6}>
                <Typography variant="h4" align="center">
                  Nessuno slot disponible
                </Typography>
              </Grid>
            )}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
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

export default BookingsPage;
