const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { v4 } = require("uuid");
const { DateTime } = require("luxon");
const { fs2luxon } = require("./utils");
const uuidv4 = v4;

exports.amIAdmin = functions
  .region("europe-west6")
  .https.onCall(async ({ organization }, context) => {
    if (!context.auth) {
      return { amIAdmin: false };
    }
    const org = (
      await admin
        .firestore()
        .collection("organizations")
        .doc(organization)
        .get()
    ).data();
    if (
      org &&
      org.admins &&
      (org.admins.includes(context.auth.token.email) ||
        org.admins.includes(context.auth.token.phone_number))
    ) {
      return { amIAdmin: true };
    }
    return { amIAdmin: false };
  });
