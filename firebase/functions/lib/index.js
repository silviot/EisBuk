"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");

exports.createTestUsers = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
