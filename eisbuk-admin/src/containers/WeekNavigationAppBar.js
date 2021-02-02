import React from "react";
import { Toolbar, AppBar, IconButton, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@material-ui/icons";
import { changeCalendarDate } from "../store/actions/actions";

const WeekNavigationAppBar = ({ extraButtons }) => {
  const classes = useStyles();
  const currentDate = useSelector((state) => state.app.calendarDay).startOf(
    "week"
  );
  const dispatch = useDispatch();
  const adjustCalendarDate = (delta) => {
    dispatch(changeCalendarDate(currentDate.plus({ days: delta })));
  };

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          className={classes.prev}
          color="inherit"
          aria-label="menu"
          onClick={() => adjustCalendarDate(-7)}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Typography
          variant="h6"
          color="inherit"
          className={classes.selectedDate}
        >
          {currentDate.toFormat("d MMMM", { locale: "it-IT" })}
          {" — "}
          {currentDate
            .plus({ days: 7 })
            .toFormat("d MMMM", { locale: "it-IT" })}
        </Typography>
        <IconButton
          edge="start"
          className={classes.next}
          color="inherit"
          aria-label="menu"
          onClick={() => adjustCalendarDate(7)}
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

export default WeekNavigationAppBar;
