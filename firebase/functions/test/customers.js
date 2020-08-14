const firebase = require("@firebase/testing");
const test = require('firebase-functions-test')();
const functions = require('firebase-functions');
const assert = require("assert");

const projectId = "test-project";
const databaseName = "test-db";
var app;


describe("test data creation", () => {
  before(async () => {
    app = firebase.initializeAdminApp({ projectId, databaseName, auth: null });
  });

  after(async () => {
    await Promise.all(firebase.apps().map((app) => app.delete()));
  });

  it("creates customers via createTestData function", async () => {
    const myfunctions = require("../index.js");
    await test.wrap(myfunctions.createTestData)();
    const fromDbFoo = await db.ref("customers/foo").once("value");
    assert.equal(fromDbFoo.val().name, "John");
    const fromDbBar = await db.ref("customers/bar").once("value");
    assert.equal(fromDbBar.val().name, "Jane");
  });
});
