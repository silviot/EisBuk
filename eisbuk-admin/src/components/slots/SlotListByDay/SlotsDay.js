import React from "react";
import Box from "@material-ui/core/Box";
import Slot from "./Slot";

const SlotsDay = ({ day, slots, isCurrent }) => {
  const slotsList = [];
  for (const slot of Object.keys(slots || {}).sort(function (a, b) {
    return slots[a].date >= slots[b].date;
  })) {
    slotsList.push(slots[slot]);
  }
  return (
    <Box key={day} id={day}>
      {isCurrent ? <b>{day}</b> : day}
      {slotsList.map((slot) => (
        <Slot data={slot}></Slot>
      ))}
    </Box>
  );
};

export default SlotsDay;
