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
