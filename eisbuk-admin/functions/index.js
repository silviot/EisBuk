const admin = require("firebase-admin");
admin.initializeApp();

exports.createTestData = require("./test_data.js").createTestData;
exports.sync_writable_records = require("./data_triggers.js").sync_writable_records;
exports.createTestSlots = require("./test_slots.js").createTestSlots;

exports.createAdminTestUsers = require("./test_data.js").createAdminTestUsers;
