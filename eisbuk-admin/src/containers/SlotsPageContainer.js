import React, { useState } from "react";
import { connect } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { deleteSlot, changeCalendarDate } from "../store/actions/actions"

import LayoutHorizontal from '../components/layout/LayoutHorizontal'
import SlotList from "../components/slots/SlotList";
import SlotCalendarDate from "../components/slots/SlotCalendar/SlotCalendarDate";
import SlotCalendar from "../components/slots/SlotCalendar";

const SlotsPageContainer = ({slots, deleteSlot, currentDate, changeCalendarDate}) => {
    useFirestoreConnect([
        {
            collection: "slots",
            orderBy: "date",
            where: [
                ["date", ">=", currentDate.startOf('day').toJSDate()],
                ["date", "<", currentDate.endOf('day').toJSDate()],
            ],
        },
    ]);

    const onCalendarDateChange = (date, isFinish) => {
        changeCalendarDate(date)
    }

    return (
        <LayoutHorizontal
        heading="Calendario"
        navRail={<>
            <SlotCalendarDate date={currentDate} />
            <SlotCalendar date={currentDate} onChange={onCalendarDateChange}/>
        </>}
        contentRail={<SlotList deleteSlot={deleteSlot} slots={slots} />}
        />
    )
}

const mapStateToProps = (state) => ({
    slots: state.firestore.ordered.slots,
    currentDate: state.app.calendarDay
})

const mapDispatchToProps = (dispatch => {
    return {
        deleteSlot: (id) => dispatch(deleteSlot(id)),
        changeCalendarDate: (date) => dispatch(changeCalendarDate(date))
    };
})

export default connect(mapStateToProps, mapDispatchToProps)(SlotsPageContainer);