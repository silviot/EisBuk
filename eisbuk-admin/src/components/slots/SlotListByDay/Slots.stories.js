import React from "react";
import SlotsDay from "./SlotsDay";

export default {
  title: "SlotsDay",
  component: SlotsDay,
};

const day = "2021-01-15";
const slots_one = {
  foo: {
    category: "agonismo",
    type: "ice",
    date: { seconds: 1609513200 },
    durations: [60],
  },
};
const slots_many = {
  ...slots_one,
  bar: {
    date: { seconds: 1609495200 },
    category: "preagonismo",
    type: "off-ice",
    durations: [90, 120],
  },
  baz: {
    date: { seconds: 1609516800 },
    category: "agonismo",
    type: "off-ice",
    durations: [90, 120],
  },
};
export const EmptyDay = () => (
  <SlotsDay day={day} slots={{}} isCurrent={true} />
);

export const OneSlot = () => (
  <SlotsDay day={day} slots={slots_one} isCurrent={true} />
);
export const ManySlots = () => (
  <SlotsDay day={day} slots={slots_many} isCurrent={true} />
);
