import React from "react";
import { useSelector } from "react-redux";

const BookingsByDay = () => {
  const currentDate = useSelector((state) => state.app.calendarDay);
  return <div>Here are the bookings for {currentDate.toISO()}!</div>;
};

export default BookingsByDay;
