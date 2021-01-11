const firebase = require("firebase/app");
const { adminDb } = require("./settings");
require("firebase/auth");

exports.retry = function (func, maxTries, delay) {
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
              typeof delay == "function" ? delay(exports.retry) : delay
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
exports.loginWithUser = async function (email) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, "secret");
  } catch (e) {
    await firebase.auth().signInWithEmailAndPassword(email, "secret");
  }
};

exports.createDefaultOrg = function () {
  const orgDefinition = {
    admins: ["test@example.com"],
  };
  return adminDb.collection("organizations").doc("default").set(orgDefinition);
};

exports.loginDefaultUser = function () {
  return exports.loginWithUser("test@example.com");
};
