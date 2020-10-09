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
    end = new admin.firestore.Timestamp(day, 0);
  const existing = await admin
    .firestore()
    .collection("slots")
    .where("date", ">=", start)
    .where("date", "<=", end)
    .get();
  existing.forEach(async function (el) {
    console.log("Deleting", el);
    await el.ref.delete();
  });
  const date = new admin.firestore.Timestamp(day + 11 * 3600, 0);
  console.log(date);
  const slot = {
    date,
    notes: "",
    type: "off-ice-danza",
    durations: [60],
    category: "preagonismo",
  };

  await admin.firestore().collection("slots").add(slot);
  console.log(slot);
  return "";
}

exports.createTestSlots = functions
  .region("europe-west6")
  .https.onCall(async (data, context) => {
    const today = roundTo(admin.firestore.Timestamp.now().seconds, 86400);
    console.log("Creating test slots for today");
    fillDay(today);
    return "From the server";
  });
