const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.sync_writable_records = functions
  .region("europe-west6")
  .firestore.document("customers/{customerId}")
  .onWrite(async (change, context) => {
    const db = admin.firestore();
    if (change.after.exists) {
      const after = change.after.data();
      if (after.secret_key) {
        // Create a record in /bookings with this secret key as id
        // TODO: maybe relocate a record, in case the id was in use already
        return db
          .collection("bookings")
          .doc(after.secret_key)
          .set({ customer_id: context.params.customerId });
      }
    } else if (change.before !== null && "secret_key" in change.before) {
      // The key was removed. Remove all bookings?
      return change.after;
    }
    return change.after;
  });
