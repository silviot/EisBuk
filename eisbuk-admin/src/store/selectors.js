import { createSelector } from "reselect";
import { fs2luxon } from "../utils/helpers";
import * as _ from "lodash";

export const calendarDaySelector = (state) => state.app.calendarDay;
export const extractSlotDate = (slot) => slot.date.seconds;
export const extractSlotId = (slot) => slot.id;

function getSafe(fn, defaultVal) {
  // Try to execute the passed function. If it fails or it returns undefined or null,
  // return the default value
  const def = defaultVal || {};
  try {
    return fn() ?? defaultVal;
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
      const slots = _.sortBy(_.values(slotsInfo), [
        extractSlotDate,
        extractSlotId,
      ]);

      return slots.map((slot) => {
        const users = Object.keys(bookingsInfo[slot.id] ?? {}).map((key) => {
          const user = allUsers[key] ?? {
            name: "Cancellato",
            surname: "Cancellato",
            secret_key: "Cancellato",
            id: key,
          };
          return {
            name: user.name,
            surname: user.surname,
            secret_key: user.secret_key,
            id: user.id,
            duration: bookingsInfo[slot.id][key],
          };
        });
        const res = {
          time: fs2luxon(slot.date).toFormat("HH:mm"),
          categories: slot.categories,
          type: slot.type,
          id: slot.id,
          users: users,
          durations: slot.durations,
        };
        if (slot.absentees) {
          res.absentees = slot.absentees;
        }
        return res;
      });
    }
  );
