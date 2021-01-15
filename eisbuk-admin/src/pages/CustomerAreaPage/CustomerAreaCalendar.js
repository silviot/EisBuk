import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { onlyUnique } from "../../utils/helpers";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Paper, Box } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";

import SlotCardCustomer from "../../components/slots/SlotCardCustomer";
import { wrapOrganization } from "../../utils/firestore";
import LuxonUtils from "@date-io/luxon";
const luxon = new LuxonUtils({ locale: "it" });

export const CustomerAreaCalendar = ({ userCategory }) => {
  const now = luxon.date();
  const classes = useStyles();
  const [date, setDate] = useState({
    start: now.startOf("day").toJSDate(),
    end: now.plus({ days: 1 }).startOf("day").toJSDate(),
    current: now.toJSDate(),
  });
  const [month, setMonth] = useState({
    start: now.startOf("month").toJSDate(),
    end: now.plus({ months: 1 }).startOf("month").toJSDate(),
  });
  const handleDateChange = (date) => {
    setDate({
      start: luxon.date(date).startOf("day").toJSDate(),
      end: luxon.date(date).plus({ days: 1 }).startOf("day").toJSDate(),
      current: luxon.date(date).toJSDate(),
    });
  };

  const handleMonthChange = (date) => {
    console.log(`Changing month from ${month} to ${date}`);
    setMonth({
      start: luxon.date(date).toJSDate(),
      end: luxon.date(date).plus({ months: 1 }).startOf("month").toJSDate(),
    });
  };
  const where = [
    ["date", ">=", date.start],
    ["date", "<", date.end],
  ];
  if (userCategory) {
    where.push(["category", "==", userCategory]);
  }
  useFirestoreConnect([
    wrapOrganization({
      collection: "slotsByMonth",
      orderBy: "date",
      where,
    }),
  ]);

  const slots = useSelector((state) => state.firestore.ordered.slots);
  const slotsByMonth = useSelector(
    (state) => state.firestore.ordered.slotsByMonth
  );
  let daysInMonth = slotsByMonth && [
    ...slotsByMonth.map((x) => luxon.date(x.date.seconds).toLocaleString()),
  ];

  return (
    <Grid container>
      <Grid component={Paper} elevation={3} item sm={12} md={4}>
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
          renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
            const date = luxon.date(day ?? null);
            const isSelected =
              daysInMonth &&
              daysInMonth
                .filter(onlyUnique)
                .includes(luxon.date(date).toLocaleString());
            return (
              <div
                style={{
                  border: isSelected ? "1px solid" : "none",
                }}
              >
                {dayComponent}
              </div>
            );
          }}
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <Box p={3}>
          <Typography variant="h3">
            {luxon.date(date.current).toLocaleString()}
          </Typography>
          <Grid container spacing={3}>
            {isLoaded(slots) &&
              !isEmpty(slots) &&
              slots.map((slot) => (
                <Grid item xs={12} key={slot.id}>
                  <SlotCardCustomer {...slot} />
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
        </Box>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  mainCalendar: {
    margin: theme.spacing(3),
  },
}));

export default CustomerAreaCalendar;
