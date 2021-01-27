import { adminDb } from "./settings";
import { retry, deleteAll } from "./utils";

beforeEach(async () => {
  await deleteAll(["customers", "bookings"]);
});

it("Applies secret_key when a customer record is added", async (done) => {
  const coll = adminDb
    .collection("organizations")
    .doc("default")
    .collection("customers");
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

  const fromDbFoo = await waitForCustomerSecretKey("foo");
  expect(fromDbFoo.data().name).toBe("John");
  expect(Boolean(fromDbFoo.data().secret_key)).toBe(true);

  const fromDbBar = await waitForCustomerSecretKey("bar");
  expect(fromDbBar.data().name).toBe("Jane");
  expect(Boolean(fromDbBar.data().secret_key)).toBe(true);
  done();
});

it("Populates bookings when a customer record is added or changed", async (done) => {
  const orgsColl = adminDb.collection("organizations").doc("default");
  const customersColl = orgsColl.collection("customers");
  const test_customers = [
    {
      name: "Jane",
      surname: "Doe",
      id: "baz",
    },
  ];
  await Promise.all(
    test_customers.map((customer) =>
      customersColl.doc(customer.id).set(customer)
    )
  );

  const fromDbBaz = await waitForCustomerSecretKey("baz");
  const bookingsInfo = await orgsColl
    .collection("bookings")
    .doc(fromDbBaz.data().secret_key)
    .get();
  expect(bookingsInfo.data().name).toEqual("Jane");
  expect(bookingsInfo.data().surname).toEqual("Doe");
  done();
});

async function waitForCustomerSecretKey(customerId) {
  var doc;
  const coll = adminDb
    .collection("organizations")
    .doc("default")
    .collection("customers");
  await retry(
    // Try to fetch the customer `foo` until
    // it includes a `secret_key` key
    async () => {
      doc = await coll.doc(customerId).get();
      return doc.data().secret_key
        ? Promise.resolve()
        : Promise.reject(
            new Error(
              `The secret key was not automatically added to ${customerId}`
            )
          );
    },
    10, // Try the above up to 10 times
    () => 400 // pause 400 ms between tries
  );
  return doc;
}
