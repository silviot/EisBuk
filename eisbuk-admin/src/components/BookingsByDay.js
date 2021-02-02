import React from "react";
import { useSelector } from "react-redux";
import { calendarDaySelector } from "../store/selectors";

const BookingsByDay = () => {
  const currentDate = useSelector(calendarDaySelector);
  return <div>Here are the bookings for {currentDate.toISO()}!</div>;
};

export default BookingsByDay;
