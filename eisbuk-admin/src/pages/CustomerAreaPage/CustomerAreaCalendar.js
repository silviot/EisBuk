import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

import moment from "moment";
import { onlyUnique } from "../../utils/helpers";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Paper, Box } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";

import SlotCardCustomer from "../../components/slots/SlotCardCustomer";

export const CustomerAreaCalendar = ({ userCategory }) => {
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

  useFirestoreConnect([
    {
      collection: "slots",
      orderBy: "date",
      where: [
        /*         ["category", "==", userCategory], */
        ["date", ">=", date.start],
        ["date", "<", date.end],
      ],
    },
    {
      collection: "slots",
      orderBy: "date",
      where: [
        /*         ["date", ">=", month.start], */
        ["date", "<", month.end],
        ["category", "==", userCategory],
      ],
      storeAs: "slotsByMonth",
    },
  ]);

  const slots = useSelector((state) => state.firestore.ordered.slots);
  const slotsByMonth = useSelector(
    (state) => state.firestore.ordered.slotsByMonth
  );
  let daysInMonth = slotsByMonth && [
    ...slotsByMonth.map((x) =>
      moment.unix(x.date.seconds).locale("it").format("D")
    ),
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
            const date = m(day ?? null);
            const isSelected =
              daysInMonth &&
              daysInMonth.filter(onlyUnique).includes(m(date).format("D"));
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
            {m(date.current).format("dddd D MMMM YYYY")}
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
