import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ColoredAvatar from "./users/coloredAvatar";

const BookingsByDay = ({ bookingDayInfo }) => {
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
              return (
                <ListItem key={`${slot.id}-${user.id}`}>
                  <ListItemAvatar>
                    <ColoredAvatar {...user} />
                  </ListItemAvatar>
                  <ListItemText primary={`${user.name} ${user.surname}`} />
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
