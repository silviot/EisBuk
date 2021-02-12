import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import DateNavigationAppBar from "../../containers/DateNavigationAppBar";
import BookingsByDay from "../../components/BookingsByDay";

import AppbarAdmin from "../../components/layout/AppbarAdmin";
import { markAbsentee } from "../../store/actions/actions";
import { useTitle } from "../../utils/helpers";

import {
  bookingDayInfoSelector,
  calendarDaySelector,
} from "../../store/selectors";

const DashboardPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useTitle("Prenotazioni");

  const currentDate = useSelector(calendarDaySelector);
  const monthStr = currentDate.toISO().substring(0, 10);
  const bookingDayInfo = useSelector(bookingDayInfoSelector(monthStr));
  const dispatchMarkAbsentee = (args) => dispatch(markAbsentee(args));
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <AppbarAdmin />
        <DateNavigationAppBar jump="day" />
        <BookingsByDay
          bookingDayInfo={bookingDayInfo}
          markAbsentee={dispatchMarkAbsentee}
        />
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

export default DashboardPage;
