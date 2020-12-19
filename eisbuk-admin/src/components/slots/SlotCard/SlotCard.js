import React from "react";
import _ from "lodash";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import { DateTime } from 'luxon'
import { slotsLabels } from "../../../config/appConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.grey[100]}`
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
  const slotDateTime = DateTime.fromSeconds(date.seconds)

  const handleDelete = (e) => {
    e.preventDefault();
    deleteSlot(id.toString());
  };

  return (
    <Box p={3} className={classes.root}>
      <Grid container>
        <Grid item xs={3} className={classes.time}>
          <Typography variant="h2" className={classes.slotTi}>
            {slotDateTime.toFormat('HH:mm')}
          </Typography>
          {durations.map((duration) => (
            <Typography key={duration}>
              {labels.durations[duration].label}
            </Typography>
          ))}
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
                <Typography>Partecipanti</Typography>
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
    </Box>
  );
};


export default SlotCard