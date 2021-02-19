import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Badge,
  IconButton,
  ListSubheader,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";
import {
  FileCopy as FileCopyIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  Assignment as AssignmentIcon,
} from "@material-ui/icons";
import Slot from "./Slot";
import SlotCreate from "../SlotCreate";
import { copySlotDay, createSlots } from "../../../store/actions/actions";
import { shiftSlotsDay } from "../../../data/slotutils";
import LuxonUtils from "@date-io/luxon";
import CustomerAreaBookingCard from "../../customerArea/CustomerAreaBookingCard";

const luxon = new LuxonUtils({ locale: "C" });

const dayCopyPasteSelector = (state) => state.copyPaste.day ?? {};

const SlotsDay = ({
  day,
  slots,
  onSubscribe,
  onUnsubscribe,
  subscribedSlots,
  onDelete,
  onCreateSlot,
  enableEdit,
  view, // If this is set to "slots" we display something else
  // TODO: refactor in a different component
}) => {
  subscribedSlots = subscribedSlots || {};
  const slotsList = [];
  const [deletedSlots, setDeletedSlots] = useState({});
  const [formIsOpen, setFormIsOpen] = useState(false);
  const dispatch = useDispatch();
  const luxonDay = luxon.parse(day, "yyyy-LL-dd");
  const dateStr = luxonDay.toFormat("EEEE d MMMM", { locale: "it-IT" });

  const extendedOnDelete =
    onDelete && enableEdit
      ? (id) => {
          // In order to get a more responsive UI we remember here the IDs of slots
          // that should be deleted. Firestore already short-circuits updates sent
          // to the server before receiving a reply, but here we'll be relying on
          // secondary data i.e. to see the update we'd need to wait for a server
          // side trigger function to update the aggregated collection
          setDeletedSlots({ ...deletedSlots, [id]: true });
          onDelete(id);
        }
      : undefined;

  // Iterate over slots sorted by timestamp
  const sorted_slots = Object.keys(slots || {}).sort(function (a, b) {
    return slots[a].date.seconds >= slots[b].date.seconds;
  });
  for (const slot_id of sorted_slots) {
    // Include the id of the slot into the payload to power actions over the slot
    slotsList.push({ ...slots[slot_id], id: slot_id });
  }
  const classes = useStyles();
  const dayInClipboard = useSelector(dayCopyPasteSelector);
  const showCreateForm = () => {
    setFormIsOpen(true);
  };
  const onClose = () => {
    setFormIsOpen(false);
  };
  const doPaste = () =>
    dispatch(createSlots(shiftSlotsDay(Object.values(dayInClipboard), day)));

  const newSlotButton = enableEdit && (
    <>
      <IconButton variant="outlined" size="small" onClick={showCreateForm}>
        <AddCircleOutlineIcon />
      </IconButton>
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
      {view === "slots" ? (
        <>
          <ListSubheader key={day + "-title"} className={classes.listSubheader}>
            <Typography display="inline" variant="h4" className={classes.date}>
              {dateStr}
            </Typography>
            <Box display="flex" className={classes.dateButtons}>
              {newSlotButton}
              {enableEdit && Boolean(slotsList.length) && (
                <IconButton
                  variant="outlined"
                  size="small"
                  onClick={() => dispatch(copySlotDay(slots))}
                >
                  <FileCopyIcon />
                </IconButton>
              )}
              {enableEdit && Object.keys(dayInClipboard).length > 0 && (
                <IconButton variant="outlined" size="small" onClick={doPaste}>
                  <Badge
                    badgeContent={Object.keys(dayInClipboard).length}
                    color="secondary"
                  >
                    <AssignmentIcon />
                  </Badge>
                </IconButton>
              )}
            </Box>
          </ListSubheader>
          <Grid className={classes.slotListContainer} container spacing={3}>
            {slotsList.map((slot) => (
              <Grid key={slot.id} item xs={12} md={6}>
                <Slot
                  data={slot}
                  key={slot.id}
                  deleted={!!deletedSlots[slot.id]}
                  onDelete={extendedOnDelete}
                  {...{
                    onSubscribe,
                    onUnsubscribe,
                    subscribedSlots,
                  }}
                ></Slot>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Grid className={classes.bookingsListContainer} container spacing={3}>
          {slotsList.map(
            (slot) =>
              Boolean(subscribedSlots[slot.id]) && (
                <Grid key={slot.id} item xs={12}>
                  <CustomerAreaBookingCard
                    data={subscribedSlots[slot.id]}
                    key={slot.id}
                    {...{ onUnsubscribe }}
                  />
                </Grid>
              )
          )}
        </Grid>
      )}
    </>
  );
};

export default SlotsDay;

const useStyles = makeStyles((theme) => ({
  listSubheader: {
    fontVariant: "small-caps",
    backgroundColor: theme.palette.background.default,

    display: "flex",
  },
  slotListContainer: {
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.divider,
    borderBottomWidth: 1,
  },
  bookingsListContainer: {
    marginTop: theme.spacing(0.5),
  },
  date: {
    "flex-grow": 1,
    color: theme.palette.getContrastText(theme.palette.background.default),
  },
  dateButtons: {
    "flex-grow": 0,
  },
}));
