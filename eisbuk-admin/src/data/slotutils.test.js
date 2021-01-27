import firebase from "firebase/app";
import "firebase/firestore";
import { shiftSlots, foo } from "./slotutils.js";
import { FBToLuxon } from "./dtutils";

const Timestamp = firebase.firestore.Timestamp;

it("Shifts a list of slots to a new day, maintaining the time", () => {
  const newSlots = shiftSlots([jan_10_slot], "2021-01-22");
  expect(foo).toEqual("foo");
  const res = FBToLuxon(newSlots[0].date);
  expect(res.setZone("Europe/Berlin").toObject()).toEqual({
    day: 22,
    hour: 11,
    millisecond: 0,
    minute: 30,
    month: 1,
    second: 0,
    year: 2021,
  });
});

const day = new Date("10 Jan 2021 11:30:00 GMT+1");
const jan_10_slot = {
  date: Timestamp.fromDate(day),
};
