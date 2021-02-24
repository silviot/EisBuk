const functions = require("firebase-functions");
const admin = require("firebase-admin");
const timestamp = require("unix-timestamp");
const { checkUser } = require("./utils");
const FIRST_NAMES = require("./italian-names.json");
const LAST_NAMES = require("./italian-surnames.json");
const { DateTime } = require("luxon");
var _ = require("lodash");
const { v4 } = require("uuid");
const uuidv4 = v4;

exports.createTestData = functions
  .region("europe-west6")
  .https.onCall(async ({ howMany = 1, organization }, context) => {
    await checkUser(organization, context.auth);
    functions.logger.info(`Creating ${howMany} test users`);
    functions.logger.error(`Creating ${howMany} test users`);
    await create_users(howMany, organization);
    return { success: true };
  });

exports.ping = functions.region("europe-west6").https.onCall((data) => {
  // Utility function to check if we can reach the functions endpoints
  console.log("ping invoked");
  return { pong: true, data: { ...data } };
});

exports.createOrganization = functions
  .region("europe-west6")
  .https.onCall(({ organization }, context) => {
    //await checkUser(organization, context.auth);
    const db = admin.firestore();
    return db
      .collection("organizations")
      .doc(organization)
      .set({
        admins: ["test@eisbuk.it"],
      });
  });

const create_users = async function (howMany, organization) {
  const db = admin.firestore();
  const org = db.collection("organizations").doc(organization);
  await _.range(howMany).map(async (i) => {
    const name = getRandom(FIRST_NAMES);
    const surname = getRandom(LAST_NAMES);
    const customer = {
      id: uuidv4(),
      birthday: "2000-01-01",
      name,
      surname,
      email: toEmail(`${name}.${surname}@example.com`.toLowerCase()),
      phone: "12345",
      category: getRandom(CATEGORIES),
      certificateExpiration: DateTime.local()
        .plus({ days: _.random(10, 200) })
        .toISODate(),
    };
    await org.collection("customers").doc(customer.id).set(customer);
  });
};

const toEmail = (str) => _.deburr(str.replace(/ /i, "."));

const CATEGORIES = ["corso", "agonismo", "preagonismo"];

function getRandom(names) {
  return names[Math.floor(Math.random() * (names.length - 1))];
}
