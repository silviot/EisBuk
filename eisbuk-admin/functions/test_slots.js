const functions = require("firebase-functions");
const firebase = require("firebase");
const admin = require("firebase-admin");
const timestamp = require("unix-timestamp");

function roundTo(val, modbase) {
  // round the given val to the nearest multiple of modbase
  // roundTo(12, 5) === 10
  // roundTo(12, 4) === 12
  // roundTo(12, 7) === 7
  // roundTo(17, 4) === 16
  return Math.floor(val / modbase) * modbase;
}

async function fillDay(day) {
  console.log(day);
  const start = new admin.firestore.Timestamp(day, 0),
    end = new admin.firestore.Timestamp(day + 86400, 0);
  const existing = await admin
    .firestore()
    .collection("slots")
    .where("date", ">=", start)
    .where("date", "<=", end)
    .get();
  existing.forEach(async (el) => {
    console.log("Deleting", el);
    await el.ref.delete();
  });
  const slotsColl = admin.firestore().collection("slots");
  const TS = admin.firestore.Timestamp;
  await slotsColl.add({
    date: new TS(day + 9 * 3600, 0),
    notes: "",
    type: "off-ice-danza",
    durations: [60],
    category: "preagonismo",
  });
  await slotsColl.add({
    date: new TS(day + 10 * 3600, 0),
    notes: "",
    type: "off-ice-gym",
    durations: [60],
    category: "preagonismo",
  });
  await slotsColl.add({
    date: new TS(day + 15 * 3600, 0),
    notes: "",
    type: "ice",
    durations: [60, 90, 120],
    category: "preagonismo",
  });
  await slotsColl.add({
    date: new TS(day + 15 * 3600, 0),
    notes: "",
    type: "ice",
    durations: [60, 90, 120],
    category: "agonismo",
  });
  return "";
}

exports.createTestSlots = functions
  .region("europe-west6")
  .https.onCall(async (data, context) => {
    const today = roundTo(admin.firestore.Timestamp.now().seconds, 86400);
    for (let i = -14; i < 15; i++) {
      const day = today + i * 86400;
      console.log("Creating test slots for day " + i);
      fillDay(day);
    }
    return "From the server";
  });
