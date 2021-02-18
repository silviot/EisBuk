import React, { useState } from "react";
import {
  Chip,
  IconButton,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { FBToLuxon } from "../../../data/dtutils";
import ConfirmDialog from "../../global/ConfirmDialog";
import { slotsLabels } from "../../../config/appConfig";
export default ({
  data,
  onDelete,
  deleted,
  onSubscribe,
  onUnsubscribe,
  subscribedSlots,
}) => {
  const classes = useStyles();
  const date = FBToLuxon(data.date);
  subscribedSlots = subscribedSlots || {};
  const doDelete = onDelete ? () => onDelete(data.id) : onDelete;
  const showSubscribe = Boolean(onUnsubscribe && onSubscribe);
  const isSubscribed = Boolean(subscribedSlots[data.id]);
  const subscribedDuration = isSubscribed && subscribedSlots[data.id].duration;
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const slotLabel = slotsLabels.types[data.type];

  const handleSubscription = (duration) => (evt) => {
    if (isSubscribed) {
      if (subscribedDuration === duration) {
        onUnsubscribe(data);
      } else {
        onUnsubscribe(data);
        onSubscribe({ ...data, duration });
      }
    } else {
      onSubscribe({ ...data, duration });
    }
  };
  return (
    <>
      {!deleted && (
        <Card className={classes.root} raised={isSubscribed}>
          <CardContent>
            <Typography display="inline" variant="h5" component="h2">
              {date.toISOTime().substring(0, 5)}
            </Typography>
            {isSubscribed && (
              <Typography
                display="inline"
                variant="h6"
                component="h3"
                className={classes.endTime}
              >
                {" "}
                -{" "}
                {date
                  .plus({ minutes: subscribedDuration })
                  .minus({ minutes: 10 })
                  .toISOTime()
                  .substring(0, 5)}
              </Typography>
            )}

            <Typography className={classes.category} color="textSecondary">
              {data.category}
            </Typography>
            <Chip
              className={classes.type}
              key="type"
              size="small"
              label={slotLabel.label}
              color={slotLabel.color}
              variant="outlined"
            />
            {data.durations.map((duration) => (
              <Chip
                clickable={showSubscribe}
                className={classes.duration}
                label={slotsLabels.durations[duration].label}
                key={duration}
                color={subscribedDuration === duration ? "primary" : undefined}
                onClick={showSubscribe ? handleSubscription(duration) : null}
              />
            ))}
          </CardContent>
          {doDelete ? (
            <CardActions className={classes.actionsContainer}>
              {doDelete && !deleted && (
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => setConfirmDeleteDialog(true)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </CardActions>
          ) : null}
        </Card>
      )}
      {confirmDeleteDialog ? (
        <ConfirmDialog
          title="Sei sicuro di voler rimuovere questo slot ?"
          open={confirmDeleteDialog}
          setOpen={setConfirmDeleteDialog}
          onConfirm={doDelete}
        >
          Questa azione non è reversibile
        </ConfirmDialog>
      ) : null}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    border: "2px solid transparent",
    position: "relative",
    "&.MuiPaper-elevation8": {
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: theme.palette.primary.main,
    },
  },
  category: {
    textTransform: "capitalize",
  },
  type: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    textTransform: "uppercase",
  },
  duration: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: theme.palette.divider,
  },
  endTime: {},
  "&.MuiPaper-elevation8": {
    border: "2px solid red",
  },
}));
