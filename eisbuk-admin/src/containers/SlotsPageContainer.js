import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import React from "react";

import SlotListByDay from "../components/slots/SlotListByDay";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { DateTime } from "luxon";

const useStyles = makeStyles((theme) => ({
  appBar: {
    "max-width": "600px",
  },
  selectedDate: {
    flexGrow: 6,
  },
  prev: {
    flexGrow: 1,
  },
  next: {
    flexGrow: 1,
  },
}));

export default ({ currentDate, slots, onDelete, onChangeCalendarDate }) => {
  const classes = useStyles();

  const adjustCalendarDate = (delta) => {
    onChangeCalendarDate(currentDate.plus({ days: delta }));
  };
  const datesToDisplay = [...Array(6 + 1).keys()].map((i) =>
    currentDate.plus({ days: i }).toISODate()
  );
  const slotsToDisplay = datesToDisplay.reduce(function (obj, x) {
    return { ...obj, [x]: {} };
  }, {});
  for (const key in slots) {
    if (Object.hasOwnProperty.call(slots, key)) {
      const slot = slots[key];
      let dayDateTime;
      try {
        dayDateTime = DateTime.fromFormat(key, "yyyy-LL-dd");
      } catch (e) {
        continue;
      }
      const diff = (dayDateTime - currentDate) / 1000;
      if (diff >= 0 && diff < ONE_WEEK) {
        slotsToDisplay[key] = slot;
      }
    }
  }
  return (
    <Box>
      <AppBar position="static" className={classes.appBar}>
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
            {currentDate.toFormat("d MMMM", { locale: "it-IT" })}-
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
        </Toolbar>
      </AppBar>
      <SlotListByDay
        slots={slotsToDisplay}
        currentDate={currentDate}
        onDelete={onDelete}
      />
    </Box>
  );
};

const ONE_WEEK = 7 * 24 * 60 * 60;
