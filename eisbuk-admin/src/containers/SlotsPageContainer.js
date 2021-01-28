import {
  Toolbar,
  AppBar,
  Box,
  IconButton,
  Typography,
  Switch,
} from "@material-ui/core";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@material-ui/icons";
import React, { useState } from "react";

import SlotListByDay from "../components/slots/SlotListByDay";

import { makeStyles } from "@material-ui/core/styles";
import { DateTime } from "luxon";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "600px",
  },
  appbar: {
    flexGrow: 0,
  },
  slotlist: {
    "& > li.MuiListSubheader-sticky": {
      top: theme.mixins.toolbar.minHeight,
    },
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

export default ({
  currentDate,
  slots,
  onDelete,
  onChangeCalendarDate,
  onSubscribe,
  onUnsubscribe,
  onCreateSlot,
  subscribedSlots,
}) => {
  const classes = useStyles();
  const [enableEdit, setEnableEdit] = useState(false);
  const adjustCalendarDate = (delta) => {
    onChangeCalendarDate(currentDate.plus({ days: delta }));
  };
  const datesToDisplay = [...Array(7).keys()].map((i) =>
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
    <Box className={classes.root}>
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
          <Switch
            edge="end"
            onChange={() => {
              setEnableEdit(!enableEdit);
            }}
            checked={enableEdit}
          />
        </Toolbar>
      </AppBar>
      <Box>
        <SlotListByDay
          className={classes.slotlist}
          slots={slotsToDisplay}
          onDelete={onDelete}
          {...{ onSubscribe, onUnsubscribe, subscribedSlots, onCreateSlot }}
        />
      </Box>
    </Box>
  );
};

const ONE_WEEK = 7 * 24 * 60 * 60;
