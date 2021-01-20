import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CategoryIcon from "@material-ui/icons/Category";
import StarsIcon from "@material-ui/icons/Stars";
import LuxonUtils from "@date-io/luxon";
import Chip from "@material-ui/core/Chip";

const luxon = new LuxonUtils({ locale: "C" });

export default ({ data, onDelete, deleted }) => {
  const date = FBToLuxon(data.date);
  var color;
  if (deleted) {
    color = "secondary";
  } else {
    color = "primary";
  }
  const doDelete = onDelete ? () => onDelete(data.id) : onDelete;
  return (
    <ListItem>
      <Chip
        key="time"
        size="small"
        color={color}
        disabled={deleted}
        icon={<AccessTimeIcon />}
        label={date.toISOTime().substring(0, 5)}
      />
      <Chip
        key="category"
        disabled={deleted}
        color={color}
        size="small"
        icon={<CategoryIcon />}
        label={data.category}
      />
      <Chip
        key="type"
        color={color}
        disabled={deleted}
        size="small"
        icon={<StarsIcon />}
        label={data.type}
      />
      {data.durations.map((val) => (
        <Chip
          disabled={deleted}
          size="small"
          color={color}
          label={val}
          key={"duration-" + val}
        />
      ))}
      {doDelete ? (
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={doDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      ) : (
        <></>
      )}
    </ListItem>
  );
};

export function FBToLuxon(fbDatetime) {
  return luxon.date(new Date(fbDatetime.seconds * 1000));
}
