const { db, adminDb } = require("./settings");
const firebase = require("firebase/app");
require("firebase/firestore");
const { loginDefaultUser, createDefaultOrg, retry } = require("./utils");

beforeEach(async () => {
  const org = adminDb.collection("organizations").doc("default");
  const existing = await org.collection("slots").get();
  const toDelete = [];
  existing.forEach(async (el) => {
    toDelete.push(el.ref.delete());
    console.log("Deleting all existing slots");
  });
  await Promise.all(toDelete);
});

it("updates the slots summary on slot creation", async () => {
  await Promise.all([createDefaultOrg(), loginDefaultUser()]);
  // Create a slot
  const org = db.collection("organizations").doc("default");
  const slot = org.collection("slots").doc("testSlot");
  // 1611964800 → Saturday, January 30, 2021 0:00:00 GMT
  const day = 1611964800;

  // Create a slot
  await slot.set({
    date: new firebase.firestore.Timestamp(day + 15 * 3600, 0),
    type: "ice",
    durations: [60, 90, 120],
    category: "agonismo",
  });
  // Now check that the aggregate collection has been updated
  const aggregateSlotsQuery = org.collection("slotsByDay").doc("2021-01");
  var aggregateSlot;
  await retry(
    // Try to fetch the aggregate slots for the day until
    // we find the newly added one
    async () => {
      aggregateSlot = (await aggregateSlotsQuery.get()).data();
      if (typeof aggregateSlot === "undefined") {
        return Promise.reject(new Error("The aggregated slot was not found"));
      }

      return Promise.resolve();
    },
    10, // Try the above up to 10 times
    () => 400 // pause 400 ms between tries
  );
  expect(aggregateSlot["2021-01-30"].testSlot.type).toStrictEqual("ice");

  // Create another slot on the previous day
  const anotherSlot = org.collection("slots").doc("anotherSlot");
  await anotherSlot.set({
    date: new firebase.firestore.Timestamp(day - 15 * 3600, 0),
    type: "ice",
    durations: [60, 90, 120],
    category: "agonismo",
  });
  await retry(
    // Try to fetch the aggregate slots for the day until
    // we find the newly added one
    async () => {
      aggregateSlot = (await aggregateSlotsQuery.get()).data();
      if (Object.keys(aggregateSlot).length != 2) {
        return Promise.reject(
          new Error("The aggregated slot does not include the new record")
        );
      }
      return Promise.resolve();
    },
    10, // Try the above up to 10 times
    () => 400 // pause 400 ms between tries
  );
  expect(aggregateSlot["2021-01-29"].anotherSlot.type).toStrictEqual("ice");
});
