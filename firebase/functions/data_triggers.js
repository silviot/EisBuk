const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.sync_writable_records = functions.region('europe-west6').database.ref('/customers/{customerId}/secret_key').onWrite(async (change, context) => {
    const db = admin.database();
    if (change.after.exists()) {
        const after = change.after.val();
        if (after.secret_key) {
            // Create a record in /bookings with this secret key as id
            functions.logger.info(`Creating record in bookings/${after.secret_key}`, after);
            // TODO: maybe relocate a record, in case the id was in use already
            return db.ref(`bookings/${after.secret_key}`).set({"user_id": context.params.customerId});
        }
    } else if (change.before !== null && "secret_key" in change.before) {
        // The key was removed. Remove all bookings?
        return change.after
    }
    return change.after;
})
