import { FBToLuxon, fromISO, luxonToFB } from "./dtutils.js";
import { DateTime } from "luxon";

export const shiftSlots = (slots, newDay) => {
  // newDay is a string representing the day in ISO format
  // slots is an array of slots
  const adjust = (el) => {
    const dtObj = FBToLuxon(el.date).toObject();
    const baseDay = fromISO(newDay).toObject();
    const newDate = DateTime.fromObject({
      ...baseDay,
      hour: dtObj.hour,
      minute: dtObj.minute,
    });
    return { ...el, date: luxonToFB(newDate) };
  };
  return slots.map(adjust);
};

export const foo = "foo";
