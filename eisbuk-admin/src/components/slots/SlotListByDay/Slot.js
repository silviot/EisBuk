import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CategoryIcon from "@material-ui/icons/Category";
import StarsIcon from "@material-ui/icons/Stars";
import LuxonUtils from "@date-io/luxon";
import Chip from "@material-ui/core/Chip";

const luxon = new LuxonUtils({ locale: "C" });

export default ({
  data,
  onDelete,
  deleted,
  onSubscribe,
  onUnsubscribe,
  subscribedSlots,
}) => {
  const date = FBToLuxon(data.date);
  subscribedSlots = subscribedSlots || {};
  const doDelete = onDelete ? () => onDelete(data.id) : onDelete;
  const showSubscribe = Boolean(onUnsubscribe && onSubscribe);
  const isSubscribed = Boolean(subscribedSlots[data.id]);
  const handleSubscription = (evt) => {
    if (isSubscribed) {
      onUnsubscribe(data);
    } else {
      onSubscribe(data);
    }
  };
  return (
    <ListItem disableGutters>
      <Chip
        key="time"
        size="small"
        disabled={deleted}
        icon={<AccessTimeIcon />}
        label={date.toISOTime().substring(0, 5)}
      />
      <Chip
        key="category"
        disabled={deleted}
        size="small"
        icon={<CategoryIcon />}
        label={data.category}
      />
      <Chip
        key="type"
        disabled={deleted}
        size="small"
        icon={<StarsIcon />}
        label={data.type}
      />
      {data.durations.map((val) => (
        <Chip
          disabled={deleted}
          size="small"
          label={val}
          key={"duration-" + val}
        />
      ))}
      {doDelete && !deleted && (
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={doDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
      {showSubscribe && !deleted && (
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={handleSubscription}
            checked={isSubscribed}
          />
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export function FBToLuxon(fbDatetime) {
  return luxon.date(new Date(fbDatetime.seconds * 1000));
}
