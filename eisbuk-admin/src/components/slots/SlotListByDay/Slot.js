import React from "react";
import Box from "@material-ui/core/Box";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CategoryIcon from "@material-ui/icons/Category";
import StarsIcon from "@material-ui/icons/Stars";
import LuxonUtils from "@date-io/luxon";
import Chip from "@material-ui/core/Chip";
const luxon = new LuxonUtils({ locale: "C" });

const Slot = ({ data }) => {
  const date = FBToLuxon(data.date);
  return (
    <Box>
      <Chip
        size="small"
        icon={<AccessTimeIcon />}
        label={date.toISOTime().substring(0, 5)}
      />
      <Chip size="small" icon={<CategoryIcon />} label={data.category} />
      <Chip size="small" icon={<StarsIcon />} label={data.type} />
      {data.durations.map((val) => (
        <Chip size="small" label={val} />
      ))}
    </Box>
  );
};

function FBToLuxon(fbDatetime) {
  return luxon.date(new Date(fbDatetime.seconds * 1000));
}

export default Slot;
