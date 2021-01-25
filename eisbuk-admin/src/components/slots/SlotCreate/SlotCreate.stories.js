import React from "react";
import SlotCreate from "./SlotCreate";

export default {
  title: "SlotCreate",
  component: SlotCreate,
};

export const EmptyForm = (args) => <SlotCreate {...args} />;
EmptyForm.args = {
  open: true,
  isoDate: "2021-01-15",
  initialValues: {
    time: "",
    category: "",
    durations: [],
    type: "",
    notes: "",
  },
};
EmptyForm.argTypes = {
  createSlot: { action: "created" },
  onClose: { action: "closed" },
};

export const FormWithValues = (args) => <SlotCreate {...args} />;
FormWithValues.args = {
  open: true,
  isoDate: "2021-01-15",
  initialValues: {
    time: "11:30",
    category: "preagonismo",
    durations: ["60", "120"],
    type: "ice",
    notes: "Here are some notes\nWith two lines",
  },
};
FormWithValues.argTypes = {
  createSlot: { action: "created" },
  onClose: { action: "closed" },
};
