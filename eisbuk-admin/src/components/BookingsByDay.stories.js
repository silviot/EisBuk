import React from "react";
import BookingsByDay from "./BookingsByDay";

export default {
  title: "Bookings by day",
  component: BookingsByDay,
};

const Template = (args) => <BookingsByDay {...args} />;
export const Empty = Template.bind({});
Empty.args = {
  bookingDayInfo: [],
};

export const OneSlot = Template.bind({});
OneSlot.args = {
  bookingDayInfo: [
    {
      time: "11:00",
      categories: ["agonismo"],
      type: "ice",
      id: "foo",
      durations: [90, 120],
      users: [],
    },
  ],
};

export const ManySlots = Template.bind({});
ManySlots.args = {
  bookingDayInfo: [
    {
      time: "11:00",
      categories: ["agonismo"],
      type: "ice",
      id: "foo",
      durations: [90, 120],
      users: [{ name: "Saul", surname: "Goodman", id: "saul", duration: 90 }],
    },
    {
      time: "12:00",
      categories: ["agonismo"],
      type: "ice",
      durations: [60, 120],
      id: "bar",
      users: [
        { name: "Walter", surname: "White", id: "walt", duration: 60 },
        { name: "Gus", surname: "Fring", id: "gus", duration: 60 },
        { name: "Saul", surname: "Goodman", id: "saul", duration: 120 },
      ],
      absentees: {
        gus: true,
      },
    },
    {
      time: "15:00",
      categories: ["agonismo", "preagonismo", "corso"],
      type: "ice",
      id: "baz",
      durations: [60],
      users: [],
    },
    {
      time: "16:30",
      categories: ["agonismo", "preagonismo"],
      type: "off-ice-danza",
      id: "bat",
      durations: [60, 90],
      users: [
        { name: "Walter", surname: "White", id: "walter", duration: 60 },
        { name: "Jesse", surname: "Pinkman", id: "jesse", duration: 90 },
      ],
    },
  ],
};

export const ManySlotsWithAbsentee = Template.bind({});
ManySlotsWithAbsentee.args = ManySlots.args;
ManySlotsWithAbsentee.argTypes = {
  markAbsentee: { action: "Absentee marked" },
};
