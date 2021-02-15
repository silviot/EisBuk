import React, { useState } from "react";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { DateTime } from "luxon";
import _ from "lodash";
import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { slotsLabels } from "../config/appConfig";
import ColoredAvatar from "./users/coloredAvatar";

const BookingsByDay = ({ bookingDayInfo, markAbsentee }) => {
  const classes = useStyles();
  const [localAbsentees, setLocalAbsentees] = useState({});

  const periods = getPeriods(bookingDayInfo);
  return (
    <Container maxWidth="sm">
      <List className={classes.root}>
        {periods.map((slot) => {
          return (
            <div key={slot.id + "-" + slot.duration} className={classes.slotWrapper}>
              <ListItem className={classes.listHeader}>
                <ListItemText
                  primary={slot.time + " - " + slot.endTime}
                  secondary={`${slot.category} ${slot.type}`}
                />
              </ListItem>
              {slot.users.map((user) => {
                var isAbsent = (slot.absentees || {})[user.id] ? true : false;
                const hasLocalChange =
                  typeof (
                    localAbsentees[slot.id] && localAbsentees[slot.id][user.id]
                  ) !== "undefined" &&
                  localAbsentees[slot.id][user.id] !== isAbsent;
                if (hasLocalChange) {
                  isAbsent = !isAbsent;
                }
                const toggleAbsent = () => {
                  setLocalAbsentees((state) => ({
                    ...state,
                    [slot.id]: { ...state[slot.id], [user.id]: !isAbsent },
                  }));
                  markAbsentee({ slot, user, isAbsent: !isAbsent });
                };
                const absenteeButtons = markAbsentee ? (
                  <Button
                    variant="contained"
                    size="small"
                    color={isAbsent ? "primary" : "secondary"}
                    onClick={toggleAbsent}
                    disabled={hasLocalChange}
                  >
                    {isAbsent ? "👎" : "👍"}
                  </Button>
                ) : null;
                const listItemClass = isAbsent ? classes.absent : "";
                const userName =
                  `${user.name} ${user.surname}` +
                  (isAbsent ? " (assente)" : "");
                return (
                  <ListItem
                    key={`${slot.id}-${user.id}`}
                    className={listItemClass}
                  >
                    <ListItemAvatar>
                      <ColoredAvatar {...user} />
                    </ListItemAvatar>
                    <ListItemText primary={userName} />
                    <ListItemSecondaryAction>
                      {absenteeButtons}
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </div>
          );
        })}
      </List>
    </Container>
  );
};

const getPeriods = (info) => {
  var result = [];
  for (let i = 0; i < info.length; i++) {
    result = result.concat(splitPeriod(info[i]));
  }
  return result;
};

const durationsMap = {};

for (let i = 0; i < slotsLabels.durations.length; i++) {
  durationsMap[slotsLabels.durations[i].id] = slotsLabels.durations[i].minutes;
}

const splitPeriod = (booking) => {
  const result = [];
  const usersByDuration = _.groupBy(booking.users, (el) => el.duration);

  Object.keys(usersByDuration).map((key) => {
    result.push({
      ...booking,
      duration: key,
      users: usersByDuration[key],
      endTime: DateTime.fromISO(booking.time)
        .plus({ minutes: durationsMap[key] })
        .toFormat("HH:mm"),
    });
  });
  return result;
};

const useStyles = makeStyles((theme) => ({
  root: {},
  listHeader: {
    backgroundColor: theme.palette.primary.light,
  },
  slotWrapper: {
    marginBottom: theme.spacing(1.5),
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,
  },
  absent: {
    backgroundColor: theme.palette.absent || grey[500],
  },
}));

export default BookingsByDay;
