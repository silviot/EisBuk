import React from "react";
import SlotsDay from "./SlotsDay";

export default {
  title: "Slots Day",
  component: SlotsDay,
};

const Template = (args) => <SlotsDay {...args} />;
export const ManySlots = Template.bind({});

ManySlots.args = {
  day: "2021-01-15",
  view: "slots",
  slots: {
    foo: {
      categories: ["agonismo", "preagonismo"],
      type: "ice",
      date: { seconds: 1609513200 },
      durations: [60],
    },
    bar: {
      date: { seconds: 1609495200 },
      categories: ["preagonismo", "agonismo", "corso"],
      type: "off-ice-danza",
      durations: [90, 120],
    },
    baz: {
      date: { seconds: 1609516800 },
      categories: ["corse"],
      type: "off-ice-gym",
      durations: [60, 90, 120],
    },
  },
};

export const ManySlotsWithDelete = Template.bind({});
ManySlotsWithDelete.args = { ...ManySlots.args, enableEdit: true };
ManySlotsWithDelete.argTypes = { onDelete: { action: "deleted" } };

export const OneSlot = Template.bind({});
OneSlot.args = { ...ManySlots.args, slots: { foo: ManySlots.args.slots.foo } };

export const EmptyDay = Template.bind({});
EmptyDay.args = { ...ManySlots.args, slots: {} };
