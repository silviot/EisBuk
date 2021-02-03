import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ColoredAvatar from "./users/coloredAvatar";

const BookingsByDay = ({ bookingDayInfo, currentDate }) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {bookingDayInfo.map((day) => {
        return (
          <>
            <ListItem className={classes.listHeader}>
              <ListItemText
                primary={day.time}
                secondary={`${day.category} ${day.type}`}
              />
            </ListItem>
            {day.users.map((user) => {
              return (
                <ListItem>
                  <ListItemAvatar>
                    <ColoredAvatar {...user} />
                  </ListItemAvatar>
                  <ListItemText primary={`${user.name} ${user.surname}`} />
                </ListItem>
              );
            })}
          </>
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
