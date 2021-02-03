import { createSelector } from "reselect";
import { fs2luxon } from "../utils/helpers";
import * as _ from "lodash";

export const calendarDaySelector = (state) => state.app.calendarDay;
export const extractSlotDate = (slot) => slot.date.seconds;

function getSafe(fn, defaultVal) {
  // Try to execute the passed function. If it fails, return the default value
  const def = defaultVal || {};
  try {
    return fn();
  } catch (e) {
    return def;
  }
}

export const makeSlotsInfoDaySelector = (dayStr) => (state) => {
  const monthStr = dayStr.substr(0, 7);
  return getSafe(() => state.firestore.data.slotsByDay[monthStr][dayStr]);
};
export const makeBookingsInfoSelector = (dayStr) => (state) =>
  getSafe(() => state.firestore.data.bookingsByDay[dayStr.substr(0, 7)]);

const allUsersSelector = (state) => state.firestore.data.customers;

export const bookingDayInfoSelector = (dayStr) =>
  createSelector(
    makeSlotsInfoDaySelector(dayStr),
    makeBookingsInfoSelector(dayStr),
    allUsersSelector,
    (slotsInfo, bookingsInfo, allUsers) => {
      const unsortedSlots = Object.keys(slotsInfo).map((key) => slotsInfo[key]);
      const slots = _.sortBy(unsortedSlots, [extractSlotDate]);
      return slots.map((slot) => {
        const users = Object.keys(bookingsInfo[slot.id] ?? {}).map((key) => ({
          name: allUsers[key].name,
          surname: allUsers[key].surname,
          secret_key: allUsers[key].secret_key,
          id: allUsers[key].id,
        }));
        const res = {
          time: fs2luxon(slot.date).toFormat("HH:mm"),
          category: slot.category,
          type: slot.type,
          id: slot.id,
          users: users,
        };
        if (slot.absentees) {
          res.absentees = slot.absentees;
        }
        return res;
      });
    }
  );
