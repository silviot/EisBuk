import { DateTime } from "luxon";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { deleteSlot, changeCalendarDate } from "../store/actions/actions";

import SlotListByDay from "../components/slots/SlotListByDay";

import { wrapOrganization } from "../utils/firestore";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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

const ONE_WEEK = 7 * 24 * 60 * 60;
export default () => {
  const classes = useStyles();
  const currentDate = useSelector((state) => state.app.calendarDay);
  const prevMonthStr = currentDate
    .minus({ months: 1 })
    .toISODate()
    .substring(0, 7);
  const currMonthStr = currentDate.toISODate().substring(0, 7);
  const nextMonthStr = currentDate
    .plus({ months: 1 })
    .toISODate()
    .substring(0, 7);
  const firestore = useFirestore();
  const monthsToQuery = [prevMonthStr, currMonthStr, nextMonthStr];
  useFirestoreConnect([
    wrapOrganization({
      collection: "slotsByDay",
      where: [firestore.FieldPath.documentId(), "in", monthsToQuery],
    }),
  ]);
  const slots = useSelector((state) => {
    const slots = {};
    if (typeof state.firestore.ordered.slotsByDay !== "undefined") {
      for (const availableSlots of state.firestore.ordered.slotsByDay) {
        for (const key in availableSlots) {
          if (Object.hasOwnProperty.call(availableSlots, key)) {
            if (key === "id") continue;
            let dayDateTime;
            try {
              dayDateTime = DateTime.fromFormat(key, "yyyy-LL-dd");
            } catch (e) {
              continue;
            }
            const diff = (dayDateTime - currentDate) / 1000;
            if (diff >= 0 && diff < ONE_WEEK) {
              slots[key] = availableSlots[key];
            }
          }
        }
      }
    }
    return slots;
  });

  const dispatch = useDispatch();

  const adjustCalendarDate = (delta) => {
    dispatch(changeCalendarDate(currentDate.plus({ days: delta })));
  };

  const onDelete = (id) => {
    dispatch(deleteSlot(id));
  };

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
            {currentDate.toLocaleString({
              locale: "it-IT",
              month: "long",
              weekday: "long",
              day: "numeric",
            })}
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
        slots={slots}
        currentDate={currentDate}
        onDelete={onDelete}
      />
    </Box>
  );
};
