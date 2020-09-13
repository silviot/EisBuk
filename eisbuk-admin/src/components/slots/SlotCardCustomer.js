import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { connect } from "react-redux";

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

export const SlotCardCustomer = (props) => {
  const classes = useStyles();
  const formattedHour = moment
    .unix(props.date.seconds)
    .locale("it")
    .format("HH:mm");
  return (
    <Card className={classes.root}>
      <div className={classes.time}>{formattedHour}</div>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1" color="textSecondary">
            <strong>Durata</strong> : {props.duration} minuti
          </Typography>
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
