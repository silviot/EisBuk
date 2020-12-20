import React from "react";
import _ from "lodash";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import { DateTime } from "luxon";
import { slotsLabels } from "../../../config/appConfig";
import DurationsList from "./DurationsList";
import UserAvatar from "./UserAvatar";
import { Avatar } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
  borderedLeftBox: {
    borderLeft: `1px solid ${theme.palette.grey[50]}`,
  },
  borderedBottomBox: {
    borderBottom: `1px solid ${theme.palette.grey[50]}`,
    "& >*": {
      marginRight: theme.spacing(1),
    },
  },
  category: {
    textTransform: "uppercase",
    fontWeight: 700,
  },
  type: {
    fontWeight: 300,
  },
  avatars: {
    "& >*": {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

export const SlotCard = ({
  deleteSlot,
  id,
  date,
  durations,
  category,
  type,
  notes,
}) => {
  const classes = useStyles();
  let labels = [];
  Object.keys(slotsLabels).forEach((x) => {
    labels[x] = _.keyBy(slotsLabels[x], "id");
  });
  const slotDateTime = DateTime.fromSeconds(date.seconds);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteSlot(id.toString());
  };

  return (
    <Box p={3} display="flex" className={classes.root}>
      <Box
        width={165}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        pr={3}
      >
        <Typography variant="h2" className={classes.slotTi}>
          {slotDateTime.toFormat("HH:mm")}
        </Typography>
        <DurationsList durations={durations} labels={labels} />
      </Box>
      <Box
        className={classes.borderedLeftBox}
        flexGrow={1}
        display="flex"
        flexDirection="column"
      >
        <Box
          display="flex"
          className={classes.borderedBottomBox}
          px={3}
          pb={1.5}
        >
          {category && (
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.category}
            >
              {labels.categories[category].label}
            </Typography>
          )}
          {type && (
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.type}
            >
              {labels.types[type].label}
            </Typography>
          )}
        </Box>
        <Box px={3} pt={1.5} display="flex" className={classes.avatars}>
          <UserAvatar />
          <Avatar style={{ opacity: 0.3 }}>
            <AddCircleOutline />
          </Avatar>
        </Box>
        <Box>{notes && notes}</Box>
      </Box>
      <Box>
        <IconButton aria-label="delete" color="primary" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SlotCard;
