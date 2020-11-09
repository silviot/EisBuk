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
import { DatePicker } from "@material-ui/pickers";
import LinearProgress from "@material-ui/core/LinearProgress";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import EventAvailable from "@material-ui/icons/EventAvailable";
import DynamicFeed from "@material-ui/icons/DynamicFeed";

import CreateBookingSlot from "../../components/slots/CreateSlot";
import BookingCard from "../../components/slots/SlotCard";

import moment from "moment";
import { onlyUnique } from "../../utils/helpers";

const SlotsPage = () => {
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
      collection: "slots",
      orderBy: "date",
      where: [
        ["date", ">=", date.start],
        ["date", "<", date.end],
      ],
    },
    {
      collection: "slots",
      orderBy: "date",
      where: [
        ["date", ">=", month.start],
        ["date", "<", month.end],
      ],
      storeAs: "slotsByMonth",
    },
  ]);

  const slots = useSelector((state) => state.firestore.ordered.slots);
  const slotsByMonth = useSelector(
    (state) => state.firestore.ordered.slotsByMonth
  );
  let daysInMonth = slotsByMonth && [
    ...slotsByMonth.map((x) => moment.unix(x.date.seconds).format("D")),
  ];

  return (
    <div className={classes.root}>
      <AppbarDrawer />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Box py={3} container className={classes.headerHero}>
          <Container maxWidth="lg">
            <Typography className={classes.pageTitle} variant="h1">
              Prenotazioni
            </Typography>
            <Button
              onClick={handleOpenCreateBooking}
              variant="outlined"
              color="primary"
              startIcon={<EventAvailable />}
            >
              Nuovo Slot
            </Button>
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
          </Container>
        </Box>
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
        {!isLoaded(slots) && <LinearProgress />}
        <Container maxWidth="md" className={classes.slotsContainer}>
          <Grid container spacing={3}>
            {isLoaded(slots) &&
              !isEmpty(slots) &&
              slots.map((slot) => (
                <Grid item xs={12} key={slot.id}>
                  <BookingCard {...slot} />
                </Grid>
              ))}
            {isLoaded(slots) && isEmpty(slots) && (
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

export default SlotsPage;
