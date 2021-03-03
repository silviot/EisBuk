import firebase from "firebase/app";
import axios from "axios";
import { adminDb } from "./settings";
import "firebase/auth";

export const retry = function (func, maxTries, delay) {
  // Retry running the (asyncrhronous) function func
  // until it resolves
  var reTry = 0;
  return new Promise((resolve, reject) => {
    function callFunc() {
      try {
        func().then(resolve, (reason) => {
          if (++reTry >= maxTries) {
            reject(reason);
          } else {
            setTimeout(
              callFunc,
              typeof delay == "function" ? delay(retry) : delay
            );
          }
        });
      } catch (e) {
        reject(e);
      }
    }
    callFunc();
  });
};

// The following function currently fails because of this issue
// with the jsdom implementation of pre-flight CORS check:
// https://github.com/jsdom/jsdom/pull/2867
// For now you need to patch your local copy manually
// A script `fix_jsdom.sh" is provided for this purpose
export const loginWithUser = async function (email) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, "secret");
  } catch (e) {
    await firebase.auth().signInWithEmailAndPassword(email, "secret");
  }
};

export const createDefaultOrg = function () {
  const orgDefinition = {
    admins: ["test@example.com"],
  };
  return adminDb.collection("organizations").doc("default").set(orgDefinition);
};

export const loginDefaultUser = function () {
  return exports.loginWithUser("test@example.com");
};

export const deleteAll = async (collections) => {
  const org = adminDb.collection("organizations").doc("default");
  return deleteAllCollections(org, collections);
};

export const deleteAllCollections = async (db, collections) => {
  const toDelete = [];
  for (const coll of collections) {
    const existing = await db.collection(coll).get();
    existing.forEach(async (el) => {
      toDelete.push(el.ref.delete());
    });
  }
  return Promise.all(toDelete);
};

export const loginWithPhone = async (phoneNumber) => {
  // Turn off phone auth app verification.
  firebase.auth().settings.appVerificationDisabledForTesting = true;

  const verifier = new firebase.auth.RecaptchaVerifier(
    document.createElement("div")
  );
  jest
    .spyOn(verifier, "verify")
    .mockImplementation(() => Promise.resolve("foo"));
  const confirmationResult = await firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, verifier);
  const response = await axios.get(
    "http://localhost:9098/emulator/v1/projects/eisbuk/verificationCodes"
  );
  var verificationCode = "foo";
  for (let i = 0; i < response.data.verificationCodes.length; i++) {
    const element = response.data.verificationCodes[i];
    if (element.phoneNumber === phoneNumber) {
      verificationCode = element.code;
    }
  }
  return confirmationResult.confirm(verificationCode);
};
