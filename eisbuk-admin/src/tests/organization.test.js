const firebase = require("firebase/app");
require("firebase/auth");
const { db, adminDb } = require("./settings");
const { loginWithUser } = require("./utils");

it("lets only admin access an organization data", async () => {
  await adminDb
    .collection("organizations")
    .doc("default")
    .set({
      admins: ["test@example.com"],
    });

  const doc = db.collection("organizations").doc("default");
  var error;
  try {
    (await doc.get()).data();
  } catch (e) {
    error = true;
  }
  expect(error).toBe(true);
  await loginWithUser("test@example.com");
  const org = (await doc.get()).data();
  console.log(org);
});
