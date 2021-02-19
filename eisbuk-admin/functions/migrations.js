//const functions = require("firebase-functions");
const functions = require("firebase-functions");
const { checkUser } = require("./utils");
const admin = require("firebase-admin");
const _ = require("lodash");

exports.migrateSlotsToPluralCategories = functions
  .region("europe-west6")
  .https.onCall(async ({ organization }, context) => {
    await checkUser(organization, context.auth);
    const org = admin.firestore().collection("organizations").doc(organization);
    const existing = await org.collection("slots").get();
    operations = [];
    existing.forEach((el) => {
      const slotData = el.data();
      if (slotData.category) {
        const newData = {
          // Remove the old `category` field and add the new `categories` one
          ..._.omit(slotData, "category"),
          categories: [slotData.category],
        };
        operations.push(org.collection("slots").doc(el.id).set(newData));
      }
    });
    console.log(`Udating ${operations.length} records`);
    await Promise.all(operations);
    console.log(`Finished: ${operations.length} records updated`);
  });
