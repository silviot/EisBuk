import { FBToLuxon, fromISO, luxonToFB } from "./dtutils.js";
import { DateTime } from "luxon";

export const shiftSlotsDay = (slots, newDay) => {
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

export const shiftSlotsWeek = (slots, oldWeekStart, newWeekStart) => {
  const difference = newWeekStart.diff(oldWeekStart, ["days"]).values.days;
  if (difference % 7 !== 0) {
    console.error(
      `oldWeekStart and newWeekStart are not a multiple of 7 days apart: ${oldWeekStart.toISO()} → ${newWeekStart.toISO()}`
    );
  }
  console.log(difference);
  const adjust = (el) => {
    const dt = FBToLuxon(el.date);
    return { ...el, date: luxonToFB(dt.plus({ days: difference })) };
  };
  return slots.map(adjust);
};
