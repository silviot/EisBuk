import functions from "firebase-functions";
import admin from "firebase-admin";

/**
 * Admin authentication function
 */
export const amIAdmin = functions
  .region("europe-west6")
  .https.onCall(async ({ organization }, context) => {
    // fail early if no auth
    if (!context.auth) return { amIAdmin: false };

    const org = (
      await admin
        .firestore()
        .collection("organizations")
        .doc(organization)
        .get()
    ).data();

    const amIAdmin: boolean =
      org &&
      org.admins &&
      (org.admins.includes(context.auth.token.email) ||
        org.admins.includes(context.auth.token.phone_number));

    return { amIAdmin };
  });
