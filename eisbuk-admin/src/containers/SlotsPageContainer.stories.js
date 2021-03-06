import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";
import "firebase/firestore";
import React, { useState } from "react";
import SlotsPageContainer from "./SlotsPageContainer";
import { DateTime } from "luxon";
import seedrandom from "seedrandom";
import _ from "lodash";

const PRNG = seedrandom("foobar");

/* Alter Math.random to refer to seedrandom's PRNG. */
Math.random = PRNG;
/* Assign a new Lodash context to a separate variable AFTER altering Math.random. */
var lodash = _.runInContext();

const Timestamp = firebase.firestore.Timestamp;
export default {
  title: "Weekly slots view",
  component: SlotsPageContainer,
};

const Template = (args) => {
  const [subscribedSlots, setSubscribedSlots] = useState({});
  const onSubscribe =
    args.onSubscribe &&
    ((slot) => {
      setSubscribedSlots({ ...subscribedSlots, [slot.id]: slot });
      args.onSubscribe(slot);
    });
  const onUnsubscribe =
    args.onUnsubscribe &&
    ((slot) => {
      const newSubscribedSlots = { ...subscribedSlots };
      delete newSubscribedSlots[slot.id];
      setSubscribedSlots(newSubscribedSlots);
      args.onUnsubscribe(slot);
    });
  return (
    <div>
      <SlotsPageContainer
        {...{ ...args, subscribedSlots, onSubscribe, onUnsubscribe }}
      />
    </div>
  );
};
const NoSlots = Template.bind({});
NoSlots.args = {
  slots: {
    "2021-01-20": {},
    "2021-01-01": {},
  },
  currentDate: DateTime.fromISO("2021-01-18"),
};

const OneSlot = Template.bind({});
OneSlot.args = {
  ...NoSlots.args,
  slots: {
    "2021-01-21": {},
    "2021-01-18": {},
    "2021-01-20": {
      foo: {
        categories: ["agonismo"],
        type: "ice",
        date: { seconds: 1609513200 },
        durations: [60],
        notes: "Pista 1",
      },
    },
  },
};

const NOTES = ["", "Pista 1", "Pista 2", "Prima riga\nSeconda riga"];

function createSlots(date, seed) {
  const random = seedrandom(seed);

  const slots = {};
  [...Array(30).keys()].map((i) => {
    const days = i - 15;
    for (let j = 0; j < 10; j++) {
      const hours = 10 + j;
      const slotDate = date.plus({ days, hours });
      const slotId = uuidv4();
      if (random() > 0.3) {
        continue;
      }
      slots[slotDate.toISODate()] = slots[slotDate.toISODate()] || {};
      slots[slotDate.toISODate()][slotId] = {
        date: new Timestamp(slotDate.ts / 1000, 0),
        categories: ["agonismo"],
        type: "ice",
        durations: [60],
        notes: lodash.sample(NOTES),
      };
    }
  });
  return slots;
}
const manySlotsDate = DateTime.fromISO("2021-01-18");
const ManySlotsWithEdit = Template.bind({});
ManySlotsWithEdit.args = {
  ...NoSlots.args,
  slots: createSlots(manySlotsDate, "seed123"),
  currentDate: manySlotsDate,
};
ManySlotsWithEdit.argTypes = {
  onDelete: { action: "deleted" },
  onCreateSlot: { action: "created" },
};

const ManySlotsWithSubscribe = Template.bind({});
ManySlotsWithSubscribe.args = {
  ...NoSlots.args,
  slots: createSlots(manySlotsDate, "seed123"),
  currentDate: manySlotsDate,
};
ManySlotsWithSubscribe.argTypes = {
  onSubscribe: { action: "subscribed" },
  onUnsubscribe: { action: "unsubscribed" },
};

// Maybe I should reorder the definitions instead of reordering them here
export { ManySlotsWithEdit, ManySlotsWithSubscribe, NoSlots, OneSlot };
