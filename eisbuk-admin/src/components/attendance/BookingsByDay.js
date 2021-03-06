import React from "react";
import { Container, List } from "@material-ui/core";
import AttendanceCard from "./AttendanceCard";

const BookingsByDay = ({ bookingDayInfo, markAbsentee }) => {
  return (
    <Container maxWidth="lg">
      <List>
        {bookingDayInfo.map((slot) => (
          <AttendanceCard
            key={slot.id}
            slot={slot}
            markAbsentee={markAbsentee}
          />
        ))}
      </List>
    </Container>
  );
};

export default BookingsByDay;
