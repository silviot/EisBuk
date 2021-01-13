import React from "react";
import SlotsDay from "./SlotsDay";

export default {
  title: "SlotsDay",
  component: SlotsDay,
};

const day = "2021-01-15";
const slots = {};
export const EmptySlot = () => (
  <SlotsDay day={day} slots={slots} isCurrent={true} />
);
