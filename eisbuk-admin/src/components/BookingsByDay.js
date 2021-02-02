import React from "react";
import { useSelector } from "react-redux";

const calendarDaySelector = (state) => state.app.calendarDay;

const BookingsByDay = () => {
  const currentDate = useSelector(calendarDaySelector);
  return <div>Here are the bookings for {currentDate.toISO()}!</div>;
};

export default BookingsByDay;
