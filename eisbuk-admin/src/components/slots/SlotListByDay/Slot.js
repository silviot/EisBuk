import React from "react";
import Box from "@material-ui/core/Box";
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
  return (
    <Box>
      <Chip
        key="time"
        size="small"
        color={color}
        onDelete={onDelete ? () => onDelete(data.id) : onDelete}
        icon={<AccessTimeIcon />}
        label={date.toISOTime().substring(0, 5)}
      />
      <Chip
        key="category"
        color={color}
        size="small"
        icon={<CategoryIcon />}
        label={data.category}
      />
      <Chip
        key="type"
        color={color}
        size="small"
        icon={<StarsIcon />}
        label={data.type}
      />
      {data.durations.map((val) => (
        <Chip size="small" color={color} label={val} key={"duration-" + val} />
      ))}
    </Box>
  );
};

function FBToLuxon(fbDatetime) {
  return luxon.date(new Date(fbDatetime.seconds * 1000));
}
