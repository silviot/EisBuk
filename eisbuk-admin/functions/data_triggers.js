const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { v4 } = require("uuid");
const uuidv4 = v4;

exports.sync_writable_records = functions
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
