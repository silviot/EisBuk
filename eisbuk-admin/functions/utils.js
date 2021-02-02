const firebase = require("firebase/app");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { DateTime } = require("luxon");

// round the given val to the nearest multiple of modbase
// roundTo(12, 5) === 10
// roundTo(12, 4) === 12
// roundTo(12, 7) === 7
// roundTo(17, 4) === 16
exports.roundTo = (val, modbase) => Math.floor(val / modbase) * modbase;

exports.checkUser = async (organization, auth) => {
  // Receives an organization name and an auth info object as
  // provided by the Firebase SDK. Raises an unauthorized exception
  // if the user is not authorized to manage the given organization
  if (auth && auth.token && auth.token.email) {
    const org = await admin
      .firestore()
      .collection("organizations")
      .doc(organization)
      .get();
    if (!org.data().admins.includes(auth.token.email)) {
      doThrow();
    }
  } else {
    doThrow();
  }
};

function doThrow() {
  throw new functions.https.HttpsError(
    500,
    "unauthorized",
    "The function must be called while authenticated with a user that is an admin of the given organization."
  );
}

exports.fs2luxon = (fsdate) => {
  // Convert a firestore date to a luxon date
  // currently ignores microseconds since seconds are already
  // more than enough for our use case
  return DateTime.fromMillis(fsdate.seconds * 1000);
};
