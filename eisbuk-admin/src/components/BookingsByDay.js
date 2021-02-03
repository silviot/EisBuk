import React from "react";
import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ColoredAvatar from "./users/coloredAvatar";

const BookingsByDay = ({ bookingDayInfo, markAbsentee }) => {
  const classes = useStyles();
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
              const isAbsent = (slot.absentees || {})[user.id] ? true : false;
              console.log(slot.id, user.id, isAbsent);
              const toggleAbsent = () => {
                markAbsentee({ slot, user, isAbsent: !isAbsent });
              };
              const absenteeButtons = markAbsentee ? (
                <Button
                  variant="contained"
                  size="small"
                  color={isAbsent ? "primary" : "secondary"}
                  onClick={toggleAbsent}
                >
                  {isAbsent ? "👎" : "👍"}
                </Button>
              ) : null;

              return (
                <ListItem key={`${slot.id}-${user.id}`}>
                  <ListItemAvatar>
                    <ColoredAvatar {...user} />
                  </ListItemAvatar>
                  <ListItemText primary={`${user.name} ${user.surname}`} />
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
}));

export default BookingsByDay;
