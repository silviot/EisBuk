import NotInterestedIcon from "@material-ui/icons/NotInterested";
import React from "react";
import Box from "@material-ui/core/Box";
import Slot from "./Slot";

const SlotsDay = ({ day, slots, isCurrent, onDelete }) => {
  const slotsList = [];
  // Iterate over slots sorted by timestamp
  const sorted_slots = Object.keys(slots || {}).sort(function (a, b) {
    return slots[a].date.seconds >= slots[b].date.seconds;
  });
  for (const slot of sorted_slots) {
    // Include the id of the slot into the payload to power actions over the slot
    slotsList.push({ ...slots[slot], id: slot });
  }

  return (
    <Box key={day} id={day}>
      <h4>{isCurrent ? <b>{day}</b> : day}</h4>
      {slotsList.length === 0 ? <NotInterestedIcon /> : ""}
      {slotsList.map((slot) => (
        <Slot data={slot} key={slot.id} onDelete={onDelete}></Slot>
      ))}
    </Box>
  );
};

export default SlotsDay;
