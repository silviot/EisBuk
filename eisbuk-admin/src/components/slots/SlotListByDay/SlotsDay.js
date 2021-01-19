import NotInterestedIcon from "@material-ui/icons/NotInterested";
import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Slot from "./Slot";

const SlotsDay = ({ day, slots, isCurrent, onDelete }) => {
  const slotsList = [];
  const [deletedSlots, setDeletedSlots] = useState({});

  const extendedOnDelete = onDelete
    ? (id) => {
        // In order to get a more responsive UI we remember here the IDs of slots
        // that should be deleted. Firestore already short-circuits updates sent
        // to the server before receiving a reply, but here we'll be relying on
        // secondary data i.e. to see the update we'd need to wait for a server
        // side trigger function to update the aggregated collection
        setDeletedSlots({ ...deletedSlots, [id]: true });
        onDelete(id);
      }
    : onDelete;

  // Iterate over slots sorted by timestamp
  const sorted_slots = Object.keys(slots || {}).sort(function (a, b) {
    return slots[a].date.seconds >= slots[b].date.seconds;
  });
  for (const slot_id of sorted_slots) {
    // Include the id of the slot into the payload to power actions over the slot
    slotsList.push({ ...slots[slot_id], id: slot_id });
  }

  return (
    <Box key={day} id={day}>
      <h4>{isCurrent ? <b>{day}</b> : day}</h4>
      {slotsList.length === 0 ? <NotInterestedIcon /> : ""}
      {slotsList.map((slot) => (
        <Slot
          data={slot}
          key={slot.id}
          onDelete={extendedOnDelete}
          deleted={!!deletedSlots[slot.id]}
        ></Slot>
      ))}
    </Box>
  );
};

export default SlotsDay;
