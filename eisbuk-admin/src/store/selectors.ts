import _ from "lodash";
import { createSelector } from "reselect";

import { LocalStore } from "@/types/store";

import { fs2luxon } from "@/utils/helpers";

export const calendarDaySelector = (state: LocalStore & any) =>
  state.app.calendarDay;
export const extractSlotDate = (slot: any) => slot.date.seconds;
export const extractSlotId = (slot: any) => slot.id;

function getSafe(fn: any, defaultVal?: any) {
  // Try to execute the passed function. If it fails or it returns undefined or null,
  // return the default value
  const def = defaultVal || {};
  try {
    return fn() ?? defaultVal;
  } catch (e) {
    return def;
  }
}

export const makeSlotsInfoDaySelector = (dayStr: any) => (state: any) => {
  const monthStr = dayStr.substr(0, 7);
  return getSafe(() => state.firestore.data.slotsByDay[monthStr][dayStr]);
};
export const makeBookingsInfoSelector = (dayStr: any) => (state: any) =>
  getSafe(() => state.firestore.data.bookingsByDay[dayStr.substr(0, 7)]);

const allUsersSelector = (state: any) => state.firestore.data.customers;

export const bookingDayInfoSelector = (dayStr: any) =>
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
            certificateExpiration: user.certificateExpiration,
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
          absentees: undefined /** @TEMP */,
        };
        if (slot.absentees) {
          res.absentees = slot.absentees;
        }
        return res;
      });
    }
  );
