import * as functions from "firebase-functions";
import admin from "firebase-admin";
import _ from "lodash";

import { checkUser } from "./utils";

/**
 * Migrates slot entries to struct containing plural 'categories' instead of single 'category'
 */
export const migrateSlotsToPluralCategories = functions
  .region("europe-west6")
  .https.onCall(async ({ organization }, context) => {
    await checkUser(organization, context.auth);

    const org = admin.firestore().collection("organizations").doc(organization);
    const existing = await org.collection("slots").get();

    let operations: Promise<any>[] = [];

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

    console.log(`Updating ${operations.length} records`);

    await Promise.all(operations);
    console.log(`Finished: ${operations.length} records updated`);
  });
