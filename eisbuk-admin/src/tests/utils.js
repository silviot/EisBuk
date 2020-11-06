const firebase = require("firebase/app");
require("firebase/auth");

const retry = function (func, maxTries, delay) {
  // Retry running the (asyncrhronous) function func
  // until it resolves
  var reTry = 0;
  return new Promise((resolve, reject) => {
    function callFunc() {
      try {
        // eslint-disable-next-line promise/catch-or-return
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
const loginWithUser = async function (email) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, "secret");
  } catch (e) {
    await firebase.auth().signInWithEmailAndPassword(email, "secret");
  }
};
exports.retry = retry;
exports.loginWithUser = loginWithUser;
