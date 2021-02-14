import React, { useState } from "react";
import {
  Chip,
  IconButton,
  Card,
  Switch,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Delete as DeleteIcon, Stars as StarsIcon } from "@material-ui/icons";
import { FBToLuxon } from "../../../data/dtutils";
import ConfirmDialog from "../../global/ConfirmDialog";

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
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const handleSubscription = (evt) => {
    if (isSubscribed) {
      onUnsubscribe(data);
    } else {
      onSubscribe(data);
    }
  };
  return (
    <>
      {!deleted && (
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {date.toISOTime().substring(0, 5)}
            </Typography>
            <Typography className={classes.category} color="textSecondary">
              {data.category}
            </Typography>
            <Chip
              className={classes.type}
              key="type"
              size="small"
              icon={<StarsIcon />}
              label={data.type}
            />
            {data.durations.map((val) => (
              <Chip
                className={classes.duration}
                label={val + "min"}
                key={"duration-" + val}
              />
            ))}
          </CardContent>
          {doDelete || showSubscribe ? (
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
              {showSubscribe && !deleted && (
                <Switch
                  edge="end"
                  onChange={handleSubscription}
                  checked={isSubscribed}
                />
              )}
            </CardActions>
          ) : null}
        </Card>
      )}
      <ConfirmDialog
        title="Sei sicuro di voler rimuovere questo slot ?"
        open={confirmDeleteDialog}
        setOpen={setConfirmDeleteDialog}
        onConfirm={doDelete}
      >
        Questa azione non è reversibile
      </ConfirmDialog>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
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
}));
