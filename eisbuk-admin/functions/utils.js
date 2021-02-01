const firebase = require("firebase/app");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

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
  console.log("Checking if user is authorized", auth, organization);
  if (auth) {
    const org = await admin
      .firestore()
      .collection("organizations")
      .doc(organization)
      .get();
    console.log(org.data());
    const uid = auth.uid;
    const name = auth.token.name || null;
    const picture = auth.token.picture || null;
    const email = auth.token.email || null;
    console.log({ uid, name, picture, email });
    return true;
  } else {
    throw new functions.https.HttpsError(
      500,
      "unauthorized",
      "The function must be called while authenticated with a user that is an admin of the given organization."
    );
  }
};
