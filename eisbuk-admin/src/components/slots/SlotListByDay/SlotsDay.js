import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ListSubheader } from "@material-ui/core";
import { FileCopy as FileCopyIcon } from "@material-ui/icons";
import {
  AddCircleOutline as AddCircleOutlineIcon,
  Assignment as AssignmentIcon,
} from "@material-ui/icons";
import Slot from "./Slot";
import SlotCreate from "../SlotCreate";
import { copySlotDay, createSlots } from "../../../store/actions/actions";
import { shiftSlots } from "../../../data/slotutils";
import LuxonUtils from "@date-io/luxon";

const luxon = new LuxonUtils({ locale: "C" });

const SlotsDay = ({
  day,
  slots,
  onSubscribe,
  onUnsubscribe,
  subscribedSlots,
  onDelete,
  onCreateSlot,
}) => {
  const slotsList = [];
  const [deletedSlots, setDeletedSlots] = useState({});
  const [formIsOpen, setFormIsOpen] = useState(false);
  const dispatch = useDispatch();
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
  const showEditButtons = Boolean(onCreateSlot);
  const dayInClipboard = useSelector((state) => state.copyPaste.day ?? {});
  const showCreateForm = () => {
    setFormIsOpen(true);
  };
  const onClose = () => {
    setFormIsOpen(false);
  };
  const doPaste = () =>
    dispatch(createSlots(shiftSlots(Object.values(dayInClipboard), day)));

  const newSlotButton = showEditButtons && (
    <>
      <Button
        variant="outlined"
        size="small"
        startIcon={<AddCircleOutlineIcon />}
        onClick={showCreateForm}
      >
        Crea
      </Button>
      <SlotCreate
        isoDate={day}
        createSlot={onCreateSlot}
        open={formIsOpen}
        onClose={onClose}
      ></SlotCreate>
    </>
  );
  return (
    <>
      <ListSubheader key={day + "-title"} className={classes.listSubheader}>
        <div className={classes.date}>{dateStr}</div>{" "}
        <div className={classes.dateButtons}>
          {newSlotButton}
          {showEditButtons && Boolean(slotsList.length) && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<FileCopyIcon />}
              onClick={() => dispatch(copySlotDay(slots))}
            >
              Copia
            </Button>
          )}
          {showEditButtons && Object.keys(dayInClipboard).length > 0 && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<AssignmentIcon />}
              onClick={doPaste}
            >
              Incolla
            </Button>
          )}
        </div>
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
    display: "flex",
    "justify-content": "space-around",
  },
  date: {
    "flex-grow": 1,
  },
  dateButtons: {
    "flex-grow": 0,
  },
}));
