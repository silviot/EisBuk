import { useEffect } from "react";
import { DateTime } from "luxon";

export const getInitials = (name, surname) => {
  return `${name[0]}${surname[0]}`;
};

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

export const fs2luxon = (fsdate) => {
  // Convert a firestore date to a luxon date
  // currently ignores microseconds since seconds are already
  // more than enough for our use case
  return DateTime.fromMillis(fsdate.seconds * 1000);
};

export const flatten = (toFlatten) => {
  // Flatten a list of objects, i.e. return an obect with all properties
  // from all objects in the list. If a property is defined inside two objects
  // the last one will prevail
  if (!toFlatten) {
    return {};
  }
  return toFlatten.reduce((partial, el) => ({ ...partial, ...el }), {});
};

// returns a string representing the month starting from startDate
// and moving by offset.
// getMonthStr(luxon`2021-01-02`, -1) → "2020-12"
export const getMonthStr = (startDate, offset) =>
  startDate
    .startOf("month")
    .plus({ months: offset })
    .toISODate()
    .substring(0, 7);

export function useTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  }, []);
}
