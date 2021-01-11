import React, { useState } from "react";
import { connect } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import {
  deleteSlot,
  changeCalendarDate,
  createSlot,
} from "../store/actions/actions";

import LayoutHorizontal from "../components/layout/LayoutHorizontal";
import SlotList from "../components/slots/SlotList";
import SlotCalendarDate from "../components/slots/SlotCalendar/SlotCalendarDate";
import SlotCalendar from "../components/slots/SlotCalendar";

import { wrapOrganization } from "../utils/firestore";
import SlotCreate from "../components/slots/SlotCreate";
import { Button } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";

const SlotsPageContainer = ({
  slots,
  deleteSlot,
  createSlot,
  currentDate,
  changeCalendarDate,
}) => {
  useFirestoreConnect([
    wrapOrganization({
      collection: "slotsByDay",
      doc: currentDate.toISODate().substring(0, 7),
    }),
  ]);

  const onCalendarDateChange = (date, isFinish) => {
    changeCalendarDate(date);
  };

  const [createSlotDrawer, setCreateSlotDrawer] = useState(false);
  const handleOpenCreateSlot = () => {
    setCreateSlotDrawer(true);
  };

  const handleCloseCreateSlot = () => {
    setCreateSlotDrawer(false);
  };

  return (
    <LayoutHorizontal
      heading="Calendario"
      callToAction={
        <Button
          style={{ borderColor: "#fff", color: "#fff" }}
          color="secondary"
          onClick={handleOpenCreateSlot}
          variant="outlined"
          startIcon={<AddCircleOutline />}
        >
          Nuovo Slot
        </Button>
      }
      navRail={
        <>
          <SlotCalendarDate date={currentDate} />
          <SlotCalendar date={currentDate} onChange={onCalendarDateChange} />
          <SlotCreate
            open={createSlotDrawer}
            onClose={handleCloseCreateSlot}
            onOpen={handleOpenCreateSlot}
            createSlot={createSlot}
          />
        </>
      }
      contentRail={<SlotList deleteSlot={deleteSlot} slots={slots} />}
    />
  );
};

const mapStateToProps = (state) => {
  // Extract the slots from the current aggregated month.
  const slots = [];
  const currentDate = state.app.calendarDay;
  const currentDateStr = currentDate.toISODate().substring(0, 10);
  if (
    state.firestore.ordered.slotsByDay &&
    state.firestore.ordered.slotsByDay.length
  ) {
    if (state.firestore.ordered.slotsByDay[0][currentDateStr]) {
      for (const slot of Object.values(
        state.firestore.ordered.slotsByDay[0][currentDateStr]
      )) {
        slots.push(slot);
      }
    }
  }
  return {
    slots,
    currentDate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSlot: (id) => dispatch(deleteSlot(id)),
    changeCalendarDate: (date) => dispatch(changeCalendarDate(date)),
    createSlot: (data) => dispatch(createSlot(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SlotsPageContainer);
