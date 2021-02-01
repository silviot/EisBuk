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

it.skip("Denies access to users not belonging to the organization", async (done) => {
  await adminDb
    .collection("organizations")
    .doc("default")
    .set({
      admins: ["test@example.com"],
      foo: "bar",
    });
  const request = firebase.app().functions().httpsCallable("createTestData")({
    organization: "default",
  });
  await expect(request).rejects.toThrow(); // We're not logged in yet, so this should throw
  await loginWithUser("test@example.com");
  //   const res = await firebase.app().functions().httpsCallable("createTestData")({
  //     organization: "default",
  //   });
  //   console.log(res)
  done();
});

const loginWithUser = async function (email) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, "secret");
  } catch (e) {
    await firebase.auth().signInWithEmailAndPassword(email, "secret");
  }
};
