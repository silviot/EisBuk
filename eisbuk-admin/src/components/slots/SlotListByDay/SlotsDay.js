import NotInterestedIcon from "@material-ui/icons/NotInterested";
import React from "react";
import Box from "@material-ui/core/Box";
import Slot from "./Slot";

const SlotsDay = ({ day, slots, isCurrent }) => {
  const slotsList = [];
  for (const slot of Object.keys(slots || {}).sort(function (a, b) {
    return slots[a].date.seconds >= slots[b].date.seconds;
  })) {
    slotsList.push({ ...slots[slot], id: slot });
  }
  return (
    <Box key={day} id={day}>
      <h4>{isCurrent ? <b>{day}</b> : day}</h4>
      {slotsList.length === 0 ? <NotInterestedIcon /> : ""}
      {slotsList.map((slot) => (
        <Slot data={slot} key={slot.id}></Slot>
      ))}
    </Box>
  );
};

export default SlotsDay;
