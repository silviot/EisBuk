import _ from "lodash";
import { createSelector } from "reselect";

import { LocalStore } from "@/types/store";
import { ExtendedSlot, Slot } from "@/types/mFirestore";

import { fs2luxon } from "@/utils/helpers";

export const calendarDaySelector = (state: LocalStore) => state.app.calendarDay;
export const extractSlotDate = (slot: Slot) => slot.date.seconds;
export const extractSlotId = (slot: Slot) => slot.id;

/**
 *
 * Try to execute the passed function.
 * If it fails or it returns default value or empty object,
 * @param fn function to execute
 * @param defaultVal default value (optional)
 * @returns first one sucessful out of: fn(), defaultVal, {}
 */
const getSafe = <F extends () => any>(fn: F, defaultVal?: ReturnType<F>) => {
  // if no default val provided, fall back to empty object
  const def = defaultVal || {};

  // try and execute the function
  try {
    const result = fn();
    // if result undefined or null, return default value (or fallback)
    return [null, undefined].includes(result) ? def : result;
  } catch {
    // if error, return default value or fallback
    return def;
  }
};

export const makeSlotsInfoDaySelector = (dayStr: string) => (
  state: LocalStore
) => {
  const monthStr = dayStr.substr(0, 7);
  return getSafe(() => state.firestore.data.slotsByDay[monthStr][dayStr]);
};
export const makeBookingsInfoSelector = (dayStr: string) => (
  state: LocalStore
) => getSafe(() => state.firestore.data.bookingsByDay[dayStr.substr(0, 7)]);

const allUsersSelector = (state: LocalStore) => state.firestore.data.customers;

export const bookingDayInfoSelector = (dayStr: string) =>
  createSelector(
    makeSlotsInfoDaySelector(dayStr),
    makeBookingsInfoSelector(dayStr),
    allUsersSelector,
    (
      slotsInfo: Record<string, ExtendedSlot<{ absentees?: unknown }>>,
      bookingsInfo,
      allUsers
    ) => {
      const slots = _.sortBy(Object.values(slotsInfo), [
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

        // process slot data for return type
        // this seems a little weird and should be reviewed within code rewrite
        /** @TODO */
        const { notes, date, ...slotBase } = slot;

        return {
          ...slotBase,
          time: fs2luxon(slot.date).toFormat(
            "HH:mm"
          ) /** @TODO check this out, might be better to do this kind of transformation at component level */,
          users: users,
        };
      });
    }
  );
