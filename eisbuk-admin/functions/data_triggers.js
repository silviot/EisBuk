const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { v4 } = require("uuid");
const { roundTo } = require("./utils");
const LuxonUtils = require("@date-io/luxon");
const luxon = new LuxonUtils({ locale: "C" });
const uuidv4 = v4;

exports.addMissingSecretKey = functions
  .region("europe-west6")
  .firestore.document("organizations/{organization}/customers/{customerId}")
  .onWrite(async (change, context) => {
    const db = admin.firestore();
    if (change.after.exists) {
      const after = change.after.data();
      const before = change.before.data();
      if (!after.secret_key) {
        const secret_key = uuidv4();
        await change.after.ref.update({ secret_key });
        // Create a record in /bookings with this secret key as id
        return db
          .collection("organizations")
          .doc(context.params.organization)
          .collection("bookings")
          .doc(secret_key)
          .set({ customer_id: context.params.customerId });
      }
    } else if (before && !change.before) {
      // The key was removed. This should not happend
      return change.after;
    }
    return change.after;
  });

exports.aggregate_slots = functions
  .region("europe-west6")
  .firestore.document("organizations/{organization}/slots/{slotId}")
  .onWrite(async (change, context) => {
    const db = admin.firestore();
    // Maintain a copy of each slot in a different structure aggregated by month.
    // This allows to update small documents while still being able to get data for
    // a whole month in a single read.
    // The cost is one extra write per each update to the slots.
    var luxon_day, newSlot;
    // Ids in firestore can never be mutated: either one will do
    const id = change.after.id || change.before.id;
    if (change.after.exists) {
      newSlot = change.after.data();
      newSlot.id = change.after.id;
      luxon_day = luxon.date(new Date(newSlot.date.seconds * 1000));
    } else {
      luxon_day = luxon.date(
        new Date(change.before.data().date.seconds * 1000)
      );
      newSlot = admin.firestore.FieldValue.delete();
    }
    const month_str = luxon_day.toISO().substring(0, 7);
    const day_str = luxon_day.toISO().substring(0, 10);
    await db
      .collection("organizations")
      .doc(context.params.organization)
      .collection("slotsByDay")
      .doc(month_str)
      .set({ [day_str]: { [id]: newSlot } }, { merge: true });
    return change.after;
  });
