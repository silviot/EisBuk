import React from "react";
import _ from "lodash";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import moment from "moment";

import { connect } from "react-redux";
import { deleteSlot } from "../../store/actions/actions";

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
    flex: 1,
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

  const formattedHour = moment.unix(date.seconds).locale("it").format("HH:mm");

  const handleDelete = (e) => {
    e.preventDefault();
    deleteSlot(id.toString());
  };

  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid item xs={3} className={classes.time}>
          {formattedHour}
        </Grid>
        <Grid xs={9} item className={classes.details}>
          <Grid container>
            <Grid item xs={4}>
              {category && (
                <Typography variant="subtitle1" color="textSecondary">
                  {labels.categories[category].label}
                </Typography>
              )}
              {type && (
                <Typography variant="subtitle1" color="textSecondary">
                  {labels.types[type].label}
                </Typography>
              )}
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={handleDelete}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
            <Grid item xs={8}>
              {durations.map((duration) => (
                <Typography key={duration}>
                  {labels.durations[duration].label}
                </Typography>
              ))}
            </Grid>
            {notes && (
              <Grid container item xs={12}>
                <Box p={3}>
                  <Typography variant="subtitle1" color="textSecondary">
                    {notes}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSlot: (id) => dispatch(deleteSlot(id)),
  };
};

export default connect(null, mapDispatchToProps)(SlotCard);
