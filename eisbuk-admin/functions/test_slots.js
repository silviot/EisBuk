const functions = require("firebase-functions");
const firebase = require("firebase");
const admin = require("firebase-admin");
const timestamp = require("unix-timestamp");
const { roundTo } = require("./utils");

async function fillDay(day) {
  const start = new admin.firestore.Timestamp(day, 0),
    end = new admin.firestore.Timestamp(day + 86400, 0);
  const org = admin.firestore().collection("organizations").doc("default");
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
      type: "off-ice-danza",
      durations: [60],
      category: "preagonismo",
    }),
    slotsColl.add({
      date: new TS(day + 10 * 3600, 0),
      type: "off-ice-gym",
      durations: [60],
      category: "preagonismo",
    }),
    slotsColl.add({
      date: new TS(day + 15 * 3600, 0),
      type: "ice",
      durations: [60, 90, 120],
      category: "preagonismo",
    }),
    slotsColl.add({
      date: new TS(day + 15 * 3600, 0),
      type: "ice",
      durations: [60, 90, 120],
      category: "agonismo",
    }),
  ];
  await Promise.all(toCreate);
  return "";
}

exports.createTestSlots = functions
  .region("europe-west6")
  .https.onCall(async (data, context) => {
    console.log("Creating test slots...");
    const today = roundTo(admin.firestore.Timestamp.now().seconds, 86400);
    const daysToFill = [];
    for (let i = -14; i < 15; i++) {
      const day = today + i * 86400;
      daysToFill.push(fillDay(day));
    }
    await Promise.all(daysToFill);
    return "Test slots created";
  });
