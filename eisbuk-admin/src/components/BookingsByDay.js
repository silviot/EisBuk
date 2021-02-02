import React from "react";

const BookingsByDay = ({ bookingDayInfo, currentDate }) => {
  return (
    <div>
      Here are the bookings for {currentDate.toISO()}!
      <br />
      {currentDate.toISO().substring(0, 10)}
      <pre>{JSON.stringify(bookingDayInfo, null, 2)}</pre>
    </div>
  );
};

export default BookingsByDay;
