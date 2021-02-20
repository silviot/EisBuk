import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Chip,
  IconButton,
  Card,
  CardContent,
  Typography,
  CardActions,
  Box,
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
  const auth = useSelector((state) => state.firebase.auth);

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
          <CardContent className={classes.wrapper}>
            <Box p={1.5}>
              <Typography
                key="start"
                display="inline"
                variant="h5"
                component="h2"
              >
                {date.toISOTime().substring(0, 5)}
              </Typography>
              {isSubscribed && (
                <Typography
                  key="end"
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
              {data.categories && // Safety check. Can be removed when migrateSlotsToPluralCategories has been applied
                auth &&
                !auth.isEmpty &&
                auth.isLoaded &&
                data.categories.map((category) => (
                  <Typography
                    className={classes.category}
                    color="textSecondary"
                    key="category"
                  >
                    {category}
                  </Typography>
                ))}
            </Box>
            <Box>
              <Chip
                className={classes.type}
                key="type"
                size="small"
                label={slotLabel.label}
                color={slotLabel.color}
                variant="outlined"
              />
            </Box>
          </CardContent>
          <Box pl={1.5} pb={1.5} pr={1.5} display="flex">
            <Box>
              {data.durations.map((duration) => (
                <Chip
                  clickable={showSubscribe}
                  className={classes.duration}
                  label={slotsLabels.durations[duration].label}
                  key={duration}
                  color={
                    subscribedDuration === duration
                      ? "primary"
                      : showSubscribe
                      ? "secondary"
                      : undefined
                  }
                  onClick={showSubscribe ? handleSubscription(duration) : null}
                />
              ))}
            </Box>
            <Box>{data.notes}</Box>
          </Box>
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
          title={`Sei sicuro di voler rimuovere lo slot del ${date.toFormat(
            "d MMMM",
            { locale: "it-IT" }
          )} alle ${date.toFormat("HH:mm")}?`}
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
  wrapper: {
    display: "flex",
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
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
