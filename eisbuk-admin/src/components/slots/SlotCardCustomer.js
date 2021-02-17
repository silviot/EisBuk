import React from "react";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";

import { slotsLabels } from "../../config/appConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  time: {
    width: 151,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.6rem",
    fontWeight: "500",
  },
}));

export const SlotCardCustomer = ({
  date,
  durations,
  type,
  category,
  notes,
}) => {
  const classes = useStyles();
  const formattedHour = moment.unix(date.seconds).locale("it").format("HH:mm");
  return (
    <Card className={classes.root}>
      <div className={classes.time}>{formattedHour}</div>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <div>
            Durata{" "}
            {durations.map((duration) => slotsLabels.durations[duration].label)}
          </div>
          <div>{slotsLabels.categories[category].label}</div>
          <div>{slotsLabels.types[type].label}</div>
          <div>{notes}</div>
        </CardContent>
      </div>
    </Card>
  );
};

export default SlotCardCustomer;
