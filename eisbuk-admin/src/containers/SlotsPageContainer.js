import React, { useState } from "react";
import { connect } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { deleteSlot, changeCalendarDate, createSlot } from "../store/actions/actions";

import LayoutHorizontal from "../components/layout/LayoutHorizontal";
import SlotList from "../components/slots/SlotList";
import SlotCalendarDate from "../components/slots/SlotCalendar/SlotCalendarDate";
import SlotCalendar from "../components/slots/SlotCalendar";

import SlotCreate from "../components/slots/SlotCreate";
import { Button, SwipeableDrawer } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";

const SlotsPageContainer = ({
  slots,
  deleteSlot,
  createSlot,
  currentDate,
  changeCalendarDate,
}) => {
  useFirestoreConnect([
    {
      collection: "slots",
      orderBy: "date",
      where: [
        ["date", ">=", currentDate.startOf("day").toJSDate()],
        ["date", "<", currentDate.endOf("day").toJSDate()],
      ],
    },
  ]);

  const onCalendarDateChange = (date, isFinish) => {
    changeCalendarDate(date);
  };

  const [createSlotDrawer, setCreateSlotDrawer] = useState(false);
  const handleOpenCreateSlot = () => {
    setCreateSlotDrawer(true);
  }

  const handleCloseCreateSlot = () => {
    setCreateSlotDrawer(false);
  };

  return (
    <>
    <LayoutHorizontal
      heading="Calendario"
      callToAction={
        <Button style={{borderColor:'#fff', color: '#fff'}} color="secondary" onClick={handleOpenCreateSlot} variant="outlined" startIcon={<AddCircleOutline />}>
          Nuovo Slot
        </Button>
      }
      navRail={
        <>
          <SlotCalendarDate date={currentDate} />
          <SlotCalendar date={currentDate} onChange={onCalendarDateChange} />
        </>
      }
      contentRail={<SlotList deleteSlot={deleteSlot} slots={slots} />}
    />
    <SlotCreate 
      open={createSlotDrawer}
      onClose={handleCloseCreateSlot}
      onOpen={handleOpenCreateSlot}
      createSlot={createSlot}
    />
    </>
  );
};

const mapStateToProps = (state) => ({
  slots: state.firestore.ordered.slots,
  currentDate: state.app.calendarDay,
});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSlot: (id) => dispatch(deleteSlot(id)),
    changeCalendarDate: (date) => dispatch(changeCalendarDate(date)),
    createSlot: (data) => dispatch(createSlot(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SlotsPageContainer);
