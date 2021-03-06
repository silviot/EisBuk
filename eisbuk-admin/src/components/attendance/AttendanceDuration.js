import React, { useState } from "react";
import {
  Button,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import EisbukAvatar from "../users/EisbukAvatar";

const useStyles = makeStyles((theme) => ({
  slotWrapper: {
    marginBottom: theme.spacing(1.5),
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,
  },
  absent: {
    backgroundColor: theme.palette.absent || theme.palette.grey[500],
  },
}));

const AttendanceDuration = ({ slotByDuration, markAbsentee }) => {
  const classes = useStyles();
  const [localAbsentees, setLocalAbsentees] = useState({});
  return (
    <div
      key={slotByDuration.id + "-" + slotByDuration.duration}
      className={classes.slotWrapper}
    >
      <ListItem className={classes.listHeader}>
        <ListItemText
          primary={
            <span>
              {slotByDuration.time} - {slotByDuration.endTime}{" "}
              <b>({slotByDuration.users.length})</b>
            </span>
          }
        />
      </ListItem>
      {slotByDuration.users.map((user) => {
        var isAbsent = (slotByDuration.absentees || {})[user.id] ? true : false;
        const hasLocalChange =
          typeof (
            localAbsentees[slotByDuration.id] &&
            localAbsentees[slotByDuration.id][user.id]
          ) !== "undefined" &&
          localAbsentees[slotByDuration.id][user.id] !== isAbsent;
        if (hasLocalChange) {
          isAbsent = !isAbsent;
        }
        const toggleAbsent = () => {
          setLocalAbsentees((state) => ({
            ...state,
            [slotByDuration.id]: {
              ...state[slotByDuration.id],
              [user.id]: !isAbsent,
            },
          }));
          markAbsentee({ slotByDuration, user, isAbsent: !isAbsent });
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
            key={`${slotByDuration.id}-${user.id}`}
            className={listItemClass}
          >
            <ListItemAvatar>
              <EisbukAvatar {...user} />
            </ListItemAvatar>
            <ListItemText primary={userName} />
            <ListItemSecondaryAction>{absenteeButtons}</ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </div>
  );
};

export default AttendanceDuration;
