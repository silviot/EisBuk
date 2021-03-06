import admin from "firebase-admin";

import * as dataTriggers from "./dataTriggers";
import * as migrations from "./migrations";
import * as security from "./security";
import * as testData from "./testData";
import * as testSlots from "./testSlots";

admin.initializeApp();

const allFunctions: Record<string, any> = {
  ...dataTriggers,
  ...migrations,
  ...security,
  ...testData,
  ...testSlots,
};

for (const key in allFunctions) {
  if (Object.prototype.hasOwnProperty.call(allFunctions, key)) {
    exports[key] = allFunctions[key];
  }
}
