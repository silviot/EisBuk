const firebase = require("firebase");
const assert = require("assert");
const admin = require("firebase-admin");

describe("test data creation via function", () => {
  before(async () => {
    firebase.initializeApp({
      projectId: "eisbuk",
      apiKey: "owner",
      authDomain: "eisbuk.firebaseapp.com",
      databaseURL: "http://localhost:9000?ns=eisbuk",
    });
    admin.initializeApp = () => null;
  });

  after(async () => {
    // await Promise.all(firebase.apps().map((app) => app.delete()));
  });

  it("creates customers via createTestData function", async () => {
    const myfunctions = require("../index.js");
    await firebase
      .functions()
      .httpsCallable("createTestData")({ howMany: 1 })
      .then((result) => console.log(result));

    // const fromDbFoo = await db.ref("customers/foo").once("value");
    // assert.equal(fromDbFoo.val().name, "John");
    // const fromDbBar = await db.ref("customers/bar").once("value");
    // assert.equal(fromDbBar.val().name, "Jane");
  });
});
