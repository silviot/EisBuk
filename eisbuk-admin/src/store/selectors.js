import { fs2luxon } from "../utils/helpers";
import * as _ from "lodash";

export const calendarDaySelector = (state) => state.app.calendarDay;
export const extractSlotDate = (slot) => slot.date.seconds;

export const bookingDayInfoSelector = (dayStr) => (state) => {
  const monthStr = dayStr.substr(0, 7);
  const dayInfo =
    ((state.firestore.data.slotsByDay &&
      state.firestore.data.slotsByDay[monthStr]) ??
      {})[dayStr] ?? {};
  const bookingsInfo =
    (state.firestore.data.bookingsByDay &&
      state.firestore.data.bookingsByDay[monthStr]) ??
    {};
  const unsortedSlots = Object.keys(dayInfo).map((key) => dayInfo[key]);
  const slots = _.sortBy(unsortedSlots, [extractSlotDate]);
  const allUsers = state.firestore.data.customers;
  return slots.map((slot) => {
    const users = [];
    Object.keys(bookingsInfo[slot.id] ?? {}).map((key) =>
      users.push({
        name: allUsers[key].name,
        surname: allUsers[key].surname,
        secret_key: allUsers[key].secret_key,
        id: allUsers[key].id,
      })
    );
    const info = {
      time: fs2luxon(slot.date).toFormat("HH:mm"),
      category: slot.category,
      type: slot.type,
      id: slot.id,
      users: users,
    };
    return info;
  });
};
