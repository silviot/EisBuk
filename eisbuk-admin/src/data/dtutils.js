import firebase from "firebase/app";
import "firebase/firestore";
import { DateTime } from "luxon";

const Timestamp = firebase.firestore.Timestamp;

export const FBToLuxon = (fbDatetime) => {
  return DateTime.fromJSDate(new Date(fbDatetime.seconds * 1000));
};

export const fromISO = (isoStr) => DateTime.fromISO(isoStr);

export const luxonToFB = (luxonTS) => Timestamp.fromDate(luxonTS.toJSDate());
