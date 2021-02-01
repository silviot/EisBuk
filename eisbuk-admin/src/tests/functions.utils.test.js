import { deleteAllCollections } from "./utils";
import { adminDb } from "./settings";
import firebase from "firebase/app";
import "firebase/functions";
import "./settings";

beforeAll(async () => {
  await deleteAllCollections(adminDb, ["organizations"]);
});

// THESE TESTS ARE DISABLED: I could not make them work

it("Can ping the functions", async (done) => {
  const result = await firebase.app().functions().httpsCallable("ping")({
    foo: "bar",
  });
  expect(result).toEqual({ data: { pong: true, data: { foo: "bar" } } });
  done();
});

it("Denies access to users not belonging to the organization", async (done) => {
  await adminDb
    .collection("organizations")
    .doc("default")
    .set({
      admins: ["test@example.com"],
      foo: "bar",
    });
  // We're not logged in yet, so this should throw
  await expect(
    firebase.app().functions().httpsCallable("createTestData")({
      organization: "default",
    })
  ).rejects.toThrow();

  // We log in with the wrong user
  await loginWithUser("wrong@example.com");
  await expect(
    firebase.app().functions().httpsCallable("createTestData")({
      organization: "default",
    })
  ).rejects.toThrow();

  //...and with the right one
  await loginWithUser("test@example.com");
  await firebase.app().functions().httpsCallable("createTestData")({
    organization: "default",
  });

  done();
});

const loginWithUser = async function (email) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, "secret");
  } catch (e) {
    await firebase.auth().signInWithEmailAndPassword(email, "secret");
  }
};
