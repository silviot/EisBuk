const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.createTestData = functions.region('europe-west6').https.onRequest(async (request, response) => {
  functions.logger.info("Creating test users");
  test_customers = [
    {
      id: "foo",
      name: "John",
      surname: "Doe",
      birthday: "21/07/1996",
    },
    {
        id: "bar",
        name: "Jane",
        surname: "Doe",
        birthday: "01/01/2005",
      },
      {
        id: "baz",
        name: "Jack",
        surname: "Doe",
        birthday: "01/01/2005",
      }
      ];
  admin.initializeApp();
  const db = admin.database();
  await test_customers.map(
    async (customer) => await db.ref(`customers/${customer.id}`).set(customer)
  );

  response.send("OK");
});
