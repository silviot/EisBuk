import { adminDb } from "./settings";
import { retry, deleteAll } from "./utils";

beforeEach(async () => {
  await deleteAll(["customers", "bookings"]);
});

it("Applies secret_key when a customer record is added and keeps customer data up to date", async (done) => {
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

  const fromDbFoo = await waitForCondition({
    collection: "customers",
    id: "foo",
    condition: hasSecretKey,
  });
  expect(fromDbFoo.name).toBe("John");
  expect(Boolean(fromDbFoo.secret_key)).toBe(true);

  const fromDbBar = await waitForCondition({
    collection: "customers",
    id: "bar",
    condition: hasSecretKey,
  });
  expect(fromDbBar.name).toBe("Jane");
  expect(Boolean(fromDbBar.secret_key)).toBe(true);
  done();
});

it("Populates bookings when a customer record is added or changed", async (done) => {
  const orgsColl = adminDb.collection("organizations").doc("default");
  const customersColl = orgsColl.collection("customers");
  const test_customer = {
    name: "Jane",
    surname: "Doe",
    id: "baz",
    category: "corso",
  };
  await customersColl.doc(test_customer.id).set(test_customer);

  const fromDbBaz = await waitForCondition({
    collection: "customers",
    id: "baz",
    condition: hasSecretKey,
  });
  const bookingsInfo = (
    await orgsColl.collection("bookings").doc(fromDbBaz.secret_key).get()
  ).data();
  expect(bookingsInfo.name).toEqual("Jane");
  expect(bookingsInfo.surname).toEqual("Doe");
  expect(bookingsInfo.category).toEqual("corso");

  await customersColl
    .doc("baz")
    .set({ ...test_customer, category: "agonismo" });
  await waitForCondition({
    collection: "customers",
    id: "baz",
    condition: (data) => data.category === "agonismo",
  });
  done();
});

function hasSecretKey(data) {
  return data && data.secret_key;
}

async function waitForCondition({
  collection,
  id,
  condition,
  attempts = 10,
  sleep = 400,
}) {
  // Retries to fetch item until condition is true.
  var doc;
  const coll = adminDb
    .collection("organizations")
    .doc("default")
    .collection(collection);
  await retry(
    // Try to fetch the customer `foo` until
    // it includes a `secret_key` key
    async () => {
      doc = (await coll.doc(id).get()).data();
      return condition(doc)
        ? Promise.resolve()
        : Promise.reject(new Error(`${id} was not updated successfully`));
    },
    attempts,
    () => sleep
  );
  return doc;
}
