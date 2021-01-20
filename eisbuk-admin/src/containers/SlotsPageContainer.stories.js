import React, { useState } from "react";
import SlotsPageContainer from "./SlotsPageContainer";
import { DateTime } from "luxon";

export default {
  title: "Calendar navigation",
  component: SlotsPageContainer,
};

const Template = (args) => {
  const [currentDate, setCurrentDate] = useState(
    DateTime.fromISO("2021-01-18")
  );
  const onChangeCalendarDate = (date) => setCurrentDate(date);
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
  onDelete: () => {},
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
