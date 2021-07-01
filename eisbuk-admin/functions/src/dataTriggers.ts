import * as functions from "firebase-functions";
import admin from "firebase-admin";
import { v4 } from "uuid";
import { DateTime } from "luxon";

import { fs2luxon } from "./utils";

const uuidv4 = v4;

/**
 * Adds the secret_key to a user if it's missing.
 * Updates a copy of a subset of user data in user's bookings doc, accessible by
 * anonymous users who have access to `secret_key`.
 * @Ivan : I don't understand this fully, I'm guessing it's like a migration/event listener
 */
export const addMissingSecretKey = functions
  .region("europe-west6")
  .firestore.document("organizations/{organization}/customers/{customerId}")
  .onWrite(async (change, context) => {
    const db = admin.firestore();
    const before = change.before.data();

    if (change.after.exists) {
      const after = change.after.data()!;
      const secretKey = after?.secret_key || uuidv4();

      // Create a record in /bookings with this secret key as id
      // and the customer name
      /**@Ivan : I'm not sure spreading false would work, should see the document interface and maybe add a mapping function */
      const bookingsRoot = {
        customer_id: context.params.customerId,
        ...(after.name && { name: after.name }),
        ...(after.surname && { surname: after.surname }),
        ...(after.category && { category: after.category }),
      };

      await db
        .collection("organizations")
        .doc(context.params.organization)
        .collection("bookings")
        .doc(secretKey)
        .set(bookingsRoot);

      return after.secret_key
        ? null
        : change.after.ref.update({ secret_key: secretKey });
    } else if (before && !change.before) {
      /**
       * @Ivan : This doesn't make much sense to me. At face value it seems like a contradiction.
       * It is also obsolete, as the return value up to this point is the same (change.after) regardless of condition
       */
      // The key was removed. This should not happend
      return change.after;
    }
    return change.after;
  });

/**
 * Maintain a copy of each slot in a different structure aggregated by month.
 * This allows to update small documents while still being able to get data for
 * a whole month in a single read.
 * The cost is one extra write per each update to the slots.
 * @Ivan : At first look, it seems to me that this could easily be solved with GraphQL (without any extra writes)
 */
export const aggregateSlots = functions
  .region("europe-west6")
  .firestore.document("organizations/{organization}/slots/{slotId}")
  .onWrite(async (change, context) => {
    const db = admin.firestore();

    let luxonDay: DateTime, newSlot: FirebaseFirestore.DocumentData;
    // Ids in firestore can never be mutated: either one will do
    const { id } = change.before || change.after;

    if (change.after.exists) {
      newSlot = change.after.data()!;
      newSlot.id =
        change.after.id; /**@Ivan : This seems somewhat unnecessary */
      luxonDay = DateTime.fromJSDate(new Date(newSlot.date.seconds * 1000));
    } else {
      luxonDay = DateTime.fromJSDate(
        new Date(change.before.data()!.date.seconds * 1000)
      );
      newSlot = admin.firestore.FieldValue.delete();
    }

    const monthStr = luxonDay.toISO().substring(0, 7);
    const dayStr = luxonDay.toISO().substring(0, 10);

    await db
      .collection("organizations")
      .doc(context.params.organization)
      .collection(
        "slotsByDay"
      ) /**@Ivan : Yeah, maybe name these slotsByMonth to avoid confusion */
      .doc(monthStr)
      .set({ [dayStr]: { [id]: newSlot } }, { merge: true });

    return change.after;
  });

/**
 * Maintain a copy of each slot in a different structure aggregated by month.
 * This allows to update small documents while still being able to get data for
 * a whole month in a single read.
 * The cost is one extra write per each update to the slots.
 * @Ivan : At first look, it seems to me that this could easily be solved with GraphQL (without any extra writes)
 */
export const aggregateBookings = functions
  .region("europe-west6")
  .firestore.document(
    "organizations/{organization}/bookings/{secretKey}/data/{bookingId}"
  )
  .onWrite(async (change, context) => {
    const db = admin.firestore();
    const userData = (
      await db
        .collection("organizations")
        .doc(context.params.organization)
        .collection("bookings")
        .doc(context.params.secretKey)
        .get()
    ).data();

    const customerId = userData!.customer_id;

    // check if update or delete
    const isUpdate = change.after.exists;

    const bookingData = isUpdate ? change.after.data()! : change.before.data()!;

    const luxonDay = fs2luxon(bookingData.date);
    const monthStr = luxonDay.toISO().substring(0, 7);

    // on update field value will be duration from update
    // on delete it will be delete sentinel
    const fieldValue = isUpdate
      ? bookingData.duration
      : admin.firestore.FieldValue.delete();

    if (!change.after.exists) console.log("deleting");

    return db
      .collection("organizations")
      .doc(context.params.organization)
      .collection("bookingsByDay")
      .doc(monthStr)
      .set({ [bookingData.id]: { [customerId]: fieldValue } }, { merge: true });
  });
