const firebase = require("@firebase/testing");
const projectId = "test-project";
const databaseName = "test-db";

describe("general", () => {
  var anonymousApp;
  var loggedInApp;

  beforeEach(async () => {
    anonymousApp = firebase.initializeTestApp({
      projectId,
      databaseName,
      auth: null,
    });
    loggedInApp = firebase.initializeTestApp({
      projectId,
      databaseName,
      auth: { uid: "foo", email: "foo@example.com" },
    });
  });

  afterEach(async () => {
    await Promise.all(firebase.apps().map((app) => app.delete()));
  });
  it("runs an empty test", () => {});

  it("checks rules on the database", async () => {
    const rules = `
            {
                "rules": {
                    ".read": "auth.uid != null",
                    ".write": "auth.uid != null"
                }
            }
          `;
    await firebase.loadDatabaseRules({ databaseName, rules });
    const anonymousDb = anonymousApp.database();
    await firebase.assertFails(anonymousDb.ref("foo/bar").set({ baz: "bat" }));
    const loggedInDb = loggedInApp.database();
    await firebase.assertSucceeds(
      loggedInDb.ref("foo/bar").set({ baz: "bat" })
    );
  });
});
