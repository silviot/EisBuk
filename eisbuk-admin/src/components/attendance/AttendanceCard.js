import React from "react";
import { DateTime } from "luxon";
import { makeStyles } from "@material-ui/styles";
import { slotsLabels } from "../../config/appConfig";
import AttendanceDuration from "./AttendanceDuration";
import { Card, Typography } from "@material-ui/core";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1.5),
  },
  absent: {
    backgroundColor: theme.palette.absent || theme.palette.grey[500],
  },
}));

const AttendanceCard = ({ slot, markAbsentee }) => {
  const classes = useStyles();
  const attendanceDurations = splitPeriod(slot);
  return (
    <Card raised={false} variant="outlined" className={classes.root}>
      <Typography>{slot.categories.map((x) => x + " ")}</Typography>
      <Typography>{slot.type}</Typography>
      {attendanceDurations.map((duration) => (
        <AttendanceDuration
          key={duration.duration}
          slotByDuration={duration}
          markAbsentee={markAbsentee}
        />
      ))}
    </Card>
  );
};

const splitPeriod = (booking) => {
  const result = [];
  const usersByDuration = _.groupBy(booking.users, (el) => el.duration);

  booking.durations.map((key) =>
    result.push({
      ...booking,
      duration: key,
      users: usersByDuration[key] || [],
      endTime: DateTime.fromISO(booking.time)
        .plus({ minutes: slotsLabels.durations[key].minutes })
        .toFormat("HH:mm"),
    })
  );
  return result;
};

export default AttendanceCard;
