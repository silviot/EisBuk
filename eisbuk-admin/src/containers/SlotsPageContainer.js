import React, { useState } from "react";
import { connect } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import {
  deleteSlot,
  changeCalendarDate,
  createSlot,
} from "../store/actions/actions";

import LayoutHorizontal from "../components/layout/LayoutHorizontal";
import SlotListByDay from "../components/slots/SlotListByDay";
import SlotCalendarDate from "../components/slots/SlotCalendar/SlotCalendarDate";
import SlotCalendar from "../components/slots/SlotCalendar";

import { wrapOrganization } from "../utils/firestore";
import SlotCreate from "../components/slots/SlotCreate";
import { Button } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";

const SlotsPageContainer = ({
  slots,
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
      contentRail={<SlotListByDay slots={slots} currentDate={currentDate} />}
    />
  );
};

const mapStateToProps = (state) => {
  var slotsByDay = state.firestore.ordered.slotsByDay;
  if (typeof slotsByDay !== "undefined") {
    slotsByDay = slotsByDay[0];
  }
  return {
    currentDate: state.app.calendarDay,
    slots: slotsByDay,
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
