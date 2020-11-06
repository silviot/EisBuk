const assert = require("assert");
const { db } = require("./settings");
const { retry } = require("./utils");

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

  const fromDbFoo = await waitForCustomerSecretKey("foo");
  assert.strictEqual(fromDbFoo.data().name, "John");
  assert.strictEqual(Boolean(fromDbFoo.data().secret_key), true);

  const fromDbBar = await waitForCustomerSecretKey("bar");
  assert.strictEqual(fromDbBar.data().name, "Jane");
  assert.strictEqual(Boolean(fromDbBar.data().secret_key), true);
  done();
});

async function waitForCustomerSecretKey(customerId) {
  var doc;
  const coll = db.collection("customers");
  await retry(
    // Try to fetch the customer `foo` until
    // it includes a `secret_key` key
    async () => {
      doc = await coll.doc(customerId).get();
      return doc.data().secret_key
        ? Promise.resolve()
        : Promise.reject(
            new Error("The secret key was not automatically added")
          );
    },
    10, // Try the above up to 10 times
    () => 400 // pause 400 ms between tries
  );
  return doc;
}
