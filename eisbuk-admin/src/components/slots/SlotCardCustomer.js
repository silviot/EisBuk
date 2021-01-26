import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
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
  let labels = [];
  Object.keys(slotsLabels).forEach((x) => {
    labels[x] = _.keyBy(slotsLabels[x], "id");
  });
  return (
    <Card className={classes.root}>
      <div className={classes.time}>{formattedHour}</div>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <div>
            Durata{" "}
            {durations.map((duration) => labels.durations[duration].label)}
          </div>
          <div>{labels.categories[category].label}</div>
          <div>{labels.types[type].label}</div>
          <div>{notes}</div>
        </CardContent>
      </div>
    </Card>
  );
};

/* const mapDispatchToProps = (dispatch) => {
  return {
    deleteSlot: (id) => dispatch(deleteSlot(id)),
  };
}; */

export default connect(null, null)(SlotCardCustomer);
