const firebase = require("firebase/app");
require("firebase/firestore");
const assert = require("assert");
const { Firestore } = require("@google-cloud/firestore");
const { credentials } = require("@grpc/grpc-js");

const adminDb = new Firestore({
  projectId: "my-project-id",
  servicePath: "localhost",
  port: 8081,
  sslCreds: credentials.createInsecure(),
  customHeaders: {
    Authorization: "Bearer owner",
  },
});

const fbConfig = {
  databaseURL: "http://localhost:8080",
  projectId: "eisbuk",
  apiKey: "AIzaSyDfUuakkXb_xV-VFRyH7yIW4Dr7YmypHRo",
  messagingSenderId: "26525409101",
  appId: "1:26525409101:web:53f88cf5f4b7d6883e6104",
};
firebase.initializeApp(fbConfig);
const db = firebase.firestore();
db.settings({
  host: "localhost:8081",
  ssl: false,
});

it("Applies secret_key when a customer record is added", async (done) => {
  const coll = db.collection("customers");
  const test_customers = [
    {
      name: "John",
      id: "foo",
    },
    {
      name: "Jane",
      id: "bar",
    },
  ];
  await Promise.all(
    test_customers.map((customer) => coll.doc(customer.id).set(customer))
  );
  await retry(
    async () => {
      const doc = await coll.doc("foo").get();
      return doc.data().secret_key
        ? Promise.resolve()
        : Promise.reject(new Error("No secret key yet"));
    },
    10, // Try the above up to 10 times
    () => 400 // pause 400 ms between tries
  );
  const fromDbFoo = await coll.doc("foo").get();
  assert.strictEqual(fromDbFoo.data().name, "John");
  assert.strictEqual(Boolean(fromDbFoo.data().secret_key), true);
  const fromDbBar = await coll.doc("bar").get();
  assert.strictEqual(fromDbBar.data().name, "Jane");
  assert.strictEqual(Boolean(fromDbBar.data().secret_key), true);
  done();
});

function retry(func, maxTries, delay) {
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
}
