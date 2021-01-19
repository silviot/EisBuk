const { db } = require("./settings");
const firebase = require("firebase/app");
require("firebase/firestore");
const {
  loginDefaultUser,
  createDefaultOrg,
  retry,
  deleteAll,
} = require("./utils");

beforeEach(async () => {
  await deleteAll(["slots", "slotsByDay"]);
});

it("updates the slots summary on slot creation", async () => {
  await Promise.all([createDefaultOrg(), loginDefaultUser()]);
  const org = db.collection("organizations").doc("default");
  // 1611964800 → Saturday, January 30, 2021 0:00:00 GMT
  const day = 1611964800;

  // Create a slot
  const slot = org.collection("slots").doc("testSlot");
  await slot.set({
    date: new firebase.firestore.Timestamp(day + 15 * 3600, 0),
    type: "ice",
    durations: [60, 90, 120],
    category: "agonismo",
  });
  // Now check that the aggregate collection has been updated
  const aggregateSlotsQuery = org.collection("slotsByDay").doc("2021-01");
  var aggregateSlot = await waitForRecord({
    record: aggregateSlotsQuery,
    num_keys: 1,
  });
  expect(aggregateSlot["2021-01-30"].testSlot.type).toStrictEqual("ice");

  // Create another slot on the previous day
  const anotherSlot = org.collection("slots").doc("anotherSlot");
  await anotherSlot.set({
    date: new firebase.firestore.Timestamp(day - 15 * 3600, 0),
    type: "ice",
    durations: [60, 90, 120],
    category: "agonismo",
  });
  aggregateSlot = await waitForRecord({
    record: aggregateSlotsQuery,
    num_keys: 2,
  });
  expect(aggregateSlot["2021-01-29"].anotherSlot.type).toStrictEqual("ice");
  expect(aggregateSlot["2021-01-29"].anotherSlot.id).toStrictEqual(
    "anotherSlot"
  );
  expect(Object.keys(aggregateSlot["2021-01-29"]).length).toStrictEqual(1);
  expect(Object.keys(aggregateSlot["2021-01-30"]).length).toStrictEqual(1);

  // Remove one slot and make sure it's no longer in the aggregated record
  await anotherSlot.delete();
  // Create a third slot in a different day
  const thirdSlot = org.collection("slots").doc("thirdSlot");
  await thirdSlot.set({
    date: new firebase.firestore.Timestamp(day - 72 * 3600, 0),
    type: "ice",
    durations: [60, 90, 120],
    category: "agonismo",
  });

  aggregateSlot = await waitForRecord({
    record: aggregateSlotsQuery,
    num_keys: 3,
  });
});

async function waitForRecord({ record, num_keys }) {
  // retry to get the given record until it contains the expected number of keys
  return await retry(
    // Try to fetch the aggregate slots for the day until
    // we find the newly added one
    async () => {
      var aggregateSlot = (await record.get()).data();
      if (!aggregateSlot || Object.keys(aggregateSlot).length !== num_keys) {
        return Promise.reject(
          new Error(`The aggregated slot with ${num_keys} keys was not found`)
        );
      }
      return aggregateSlot;
    },
    10, // Try the above up to 10 times
    () => 400 // pause 400 ms between tries
  );
}
