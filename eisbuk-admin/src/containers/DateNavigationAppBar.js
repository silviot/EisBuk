import React from "react";
import { Toolbar, AppBar, IconButton, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@material-ui/icons";
import { changeCalendarDate } from "../store/actions/actions";

const JUMPS = {
  week: {
    display: (currentDate) =>
      currentDate.toFormat("d MMMM", { locale: "it-IT" }) +
      " — " +
      currentDate.plus({ days: 7 }).toFormat("d MMMM", { locale: "it-IT" }),
    delta: {
      days: 7,
    },
  },
  day: {
    display: (currentDate) =>
      currentDate.toFormat("EEEE d MMMM", { locale: "it-IT" }),
    delta: {
      days: 1,
    },
  },
};

const multiply = (factor, delta) => {
  return Object.keys(delta).reduce(function (obj, key) {
    obj[key] = delta[key] * factor;
    return obj;
  }, {});
};

const calendarDaySelector = (state) => state.app.calendarDay;

const DateNavigationAppBar = ({ extraButtons, jump = "week" }) => {
  const classes = useStyles();
  const currentDate = useSelector(calendarDaySelector).startOf(jump);
  const dispatch = useDispatch();
  const adjustCalendarDate = (factor) => {
    dispatch(
      changeCalendarDate(currentDate.plus(multiply(factor, JUMPS[jump].delta)))
    );
  };
  console.log(JUMPS);
  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          className={classes.prev}
          color="inherit"
          aria-label="menu"
          onClick={() => adjustCalendarDate(-1)}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Typography
          variant="h6"
          color="inherit"
          className={classes.selectedDate}
        >
          {JUMPS[jump].display(currentDate)}
        </Typography>
        <IconButton
          edge="start"
          className={classes.next}
          color="inherit"
          aria-label="menu"
          onClick={() => adjustCalendarDate(1)}
        >
          <ChevronRightIcon />
        </IconButton>
        {extraButtons}
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  appbar: {
    flexGrow: 0,
  },
  selectedDate: {
    flexGrow: 6,
    textAlign: "center",
  },
  prev: {
    flexGrow: 1,
  },
  next: {
    flexGrow: 1,
  },
}));

export default DateNavigationAppBar;
