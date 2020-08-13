"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestUsers = void 0;
const functions = require("firebase-functions");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.createTestUsers = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});
//# sourceMappingURL=index.js.map