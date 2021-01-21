import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import React, { useState } from "react";
import SlotsPageContainer from "./SlotsPageContainer";
import { DateTime } from "luxon";

const Timestamp = firebase.firestore.Timestamp;
export default {
  title: "Calendar navigation",
  component: SlotsPageContainer,
};

const Template = (args) => {
  const [currentDate, setCurrentDate] = useState(
    args.currentDate || DateTime.local()
  );
  const onChangeCalendarDate = (date) => {
    setCurrentDate(date);
    console.log(date, currentDate);
  };
  return (
    <SlotsPageContainer
      currentDate={currentDate}
      onChangeCalendarDate={onChangeCalendarDate}
      {...args}
    />
  );
};
export const NoSlotsExample = Template.bind({});
NoSlotsExample.args = {
  slots: {
    "2021-01-20": {},
    "2021-01-01": {},
  },
  currentDate: DateTime.fromISO("2021-01-18"),
};

export const OneSlot = Template.bind({});
OneSlot.args = {
  ...NoSlotsExample.args,
  slots: {
    "2021-01-21": {},
    "2021-01-18": {},
    "2021-01-20": {
      foo: {
        category: "agonismo",
        type: "ice",
        date: { seconds: 1609513200 },
        durations: [60],
      },
    },
  },
};

function createSlots(date) {
  const slots = {};
  [...Array(30).keys()].map((i) => {
    for (let i = 0; i < 5; i++) {
      if (Math.random() > 0.3) {
        continue;
      }
      const slotDate = date.plus({
        days: i - 15,
        hours: 10 + Math.ceil(Math.random() * 8),
      });
      const slotId = uuidv4();
      slots[slotDate.toISODate()] = {
        [slotId]: {
          date: new Timestamp(slotDate.ts / 1000, 0),
          category: "agonismo",
          type: "ice",
          durations: [60],
        },
      };
    }
    return null;
  });
  return slots;
}
const manySlotsDate = DateTime.fromISO("2021-01-18");
export const ManySlots = Template.bind({});
ManySlots.args = {
  ...NoSlotsExample.args,
  slots: createSlots(manySlotsDate),
  currentDate: manySlotsDate,
  onDelete: () => {},
};
