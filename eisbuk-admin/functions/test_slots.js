const functions = require("firebase-functions");
const { checkUser } = require("./utils");
const admin = require("firebase-admin");
const { roundTo } = require("./utils");
const _ = require("lodash");

const NOTES = ["", "Pista 1", "Pista 2"];
const TYPES = ["off-ice-danza", "ice", "off-ice-gym"];
const CATEGORIES = ["agonismo", "preagonismo", "corso"];

async function fillDay(day, organization) {
  const start = new admin.firestore.Timestamp(day, 0),
    end = new admin.firestore.Timestamp(day + 86400, 0);
  const org = admin.firestore().collection("organizations").doc(organization);
  const existing = await org
    .collection("slots")
    .where("date", ">=", start)
    .where("date", "<=", end)
    .get();
  const toDelete = [];
  existing.forEach(async (el) => {
    toDelete.push(el.ref.delete());
  });
  await Promise.all(toDelete);
  const slotsColl = org.collection("slots");
  const TS = admin.firestore.Timestamp;
  const toCreate = [
    slotsColl.add({
      date: new TS(day + 9 * 3600, 0),
      type: _.sample(TYPES),
      durations: [60],
      categories: _.sampleSize(CATEGORIES, _.random(CATEGORIES.length - 1) + 1),
      notes: _.sample(NOTES),
    }),
    slotsColl.add({
      date: new TS(day + 10 * 3600, 0),
      type: _.sample(TYPES),
      durations: [60],
      categories: _.sampleSize(CATEGORIES, _.random(CATEGORIES.length - 1) + 1),
      notes: _.sample(NOTES),
    }),
    slotsColl.add({
      date: new TS(day + 15 * 3600, 0),
      type: _.sample(TYPES),
      durations: [60, 90, 120],
      categories: _.sampleSize(CATEGORIES, _.random(CATEGORIES.length - 1) + 1),
      notes: _.sample(NOTES),
    }),
    slotsColl.add({
      date: new TS(day + 17.5 * 3600, 0),
      type: _.sample(TYPES),
      durations: [60, 90, 120],
      categories: _.sampleSize(CATEGORIES, _.random(CATEGORIES.length - 1) + 1),
      notes: _.sample(NOTES),
    }),
  ];
  await Promise.all(toCreate);
  return "";
}

exports.createTestSlots = functions
  .region("europe-west6")
  .https.onCall(async ({ organization }, context) => {
    await checkUser(organization, context.auth);
    console.log("Creating test slots...");
    const today = roundTo(admin.firestore.Timestamp.now().seconds, 86400);
    const daysToFill = [];
    for (let i = -14; i < 15; i++) {
      const day = today + i * 86400;
      daysToFill.push(fillDay(day, organization));
    }
    await Promise.all(daysToFill);
    return "Test slots created";
  });
