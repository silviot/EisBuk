import React from "react";
import { useSelector, useDispatch } from "react-redux";
import DateNavigationAppBar from "../containers/DateNavigationAppBar";
import BookingsByDay from "../components/attendance/BookingsByDay";

import { markAbsentee } from "../store/actions/actions";

import {
  bookingDayInfoSelector,
  calendarDaySelector,
} from "../store/selectors";

const AttendanceContainer = () => {
  const dispatch = useDispatch();

  const currentDate = useSelector(calendarDaySelector);
  const monthStr = currentDate.toISO().substring(0, 10);
  const bookingDayInfo = useSelector(bookingDayInfoSelector(monthStr));
  const dispatchMarkAbsentee = (args) => dispatch(markAbsentee(args));
  return (
    <>
      <DateNavigationAppBar jump="day" />
      <BookingsByDay
        bookingDayInfo={bookingDayInfo}
        markAbsentee={dispatchMarkAbsentee}
      />
    </>
  );
};

export default AttendanceContainer;
