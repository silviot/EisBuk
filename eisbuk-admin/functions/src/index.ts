import admin from "firebase-admin";

admin.initializeApp();

import * as dataTriggers from "./dataTriggers";
import * as migrations from "./migrations";
import * as security from "./security";
import * as testData from "./testData";
import * as testSlots from "./testSlots";

export default {
  ...dataTriggers,
  ...migrations,
  ...security,
  ...testData,
  ...testSlots,
};
