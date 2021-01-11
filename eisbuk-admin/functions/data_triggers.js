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
        await db
          .collection("organizations")
          .doc(context.params.organization)
          .collection("customers")
          .doc(context.params.customerId)
          .update({ secret_key });
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
    // A slot record was changed. We need to update the day it used
    // to be in and the new day, if they're different.
    if (typeof change.after.data() == "undefined") {
      console.log("Slot was deleted");
    } else {
      const start_seconds = roundTo(change.after.data().date.seconds, 86400);
      const start = luxon.date(new Date(start_seconds * 1000));
      await updateSlotDay({
        organization: context.params.organization,
        day: start,
      });
    }
    return change.after;
  });

async function updateSlotDay({ organization, day }) {
  // day should be a luxon date object
  const db = admin.firestore();
  const slots_qs = await db
    .collection("organizations")
    .doc(organization)
    .collection("slots")
    .where("date", ">=", day.startOf("day").toJSDate())
    .where("date", "<=", day.endOf("day").toJSDate())
    .get();
  const dayAggregate = {};
  slots_qs.forEach((el) => {
    dayAggregate[el.id] = el.data();
  });
  const day_str = day.toISO().substring(0, 10);
  const month_str = day_str.substring(0, 7);
  await db
    .collection("organizations")
    .doc(organization)
    .collection("slotsByDay")
    .doc(month_str)
    .set({ [day_str]: dayAggregate }, { merge: true });
}
