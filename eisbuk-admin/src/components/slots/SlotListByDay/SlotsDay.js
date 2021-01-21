import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import Slot from "./Slot";
import LuxonUtils from "@date-io/luxon";

const luxon = new LuxonUtils({ locale: "C" });

const SlotsDay = ({
  day,
  slots,
  onSubscribe,
  onUnsubscribe,
  subscribedSlots,
  onDelete,
}) => {
  const slotsList = [];
  const [deletedSlots, setDeletedSlots] = useState({});
  const luxonDay = luxon.parse(day, "yyyy-LL-dd");
  const dateStr = luxonDay.toFormat("EEEE d MMMM", { locale: "it-IT" });
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
  const classes = useStyles();
  return (
    <>
      <ListSubheader key={day + "-title"} className={classes.listSubheader}>
        {dateStr}
      </ListSubheader>
      {slotsList.map((slot) => (
        <Slot
          data={slot}
          key={slot.id}
          deleted={!!deletedSlots[slot.id]}
          onDelete={extendedOnDelete}
          {...{ onSubscribe, onUnsubscribe, subscribedSlots }}
        ></Slot>
      ))}
    </>
  );
};

export default SlotsDay;

const useStyles = makeStyles((theme) => ({
  listSubheader: {
    backgroundColor: "white",
  },
}));
