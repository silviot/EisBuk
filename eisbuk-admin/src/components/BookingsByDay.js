import React, { useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import ColoredAvatar from "./users/coloredAvatar";

const BookingsByDay = ({ bookingDayInfo, markAbsentee }) => {
  const classes = useStyles();
  const [localAbsentees, setLocalAbsentees] = useState({});
  return (
    <List className={classes.root}>
      {bookingDayInfo.map((slot) => {
        return (
          <React.Fragment key={slot.id}>
            <ListItem className={classes.listHeader}>
              <ListItemText
                primary={slot.time}
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
                `${user.name} ${user.surname}` + (isAbsent ? " (assente)" : "");
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
          </React.Fragment>
        );
      })}
    </List>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
  },
  listHeader: {
    backgroundColor: theme.palette.primary.light,
  },
  absent: {
    backgroundColor: theme.palette.absent || grey[500],
  },
}));

export default BookingsByDay;
