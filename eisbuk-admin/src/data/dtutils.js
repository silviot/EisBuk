import { DateTime } from "luxon";

export const FBToLuxon = (fbDatetime) => {
  return DateTime.fromJSDate(new Date(fbDatetime.seconds * 1000));
};
