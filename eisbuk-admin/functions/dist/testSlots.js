"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestSlots = void 0;
const firebase_functions_1 = __importDefault(require("firebase-functions"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const lodash_1 = __importDefault(require("lodash"));
const enums_1 = require("./types/enums");
const utils_1 = require("./utils");
const CATEGORIES = Object.values(enums_1.Categories);
const NOTES = Object.values(enums_1.Notes);
const TYPES = Object.values(enums_1.Types);
const fillDay = (day, organization) => __awaiter(void 0, void 0, void 0, function* () {
    const start = new firebase_admin_1.default.firestore.Timestamp(day, 0);
    const end = new firebase_admin_1.default.firestore.Timestamp(day + 86400, 0);
    const org = firebase_admin_1.default.firestore().collection("organizations").doc(organization);
    const existing = yield org
        .collection("slots")
        .where("date", ">=", start)
        .where("date", "<=", end)
        .get();
    let toDelete = [];
    existing.forEach((el) => {
        toDelete.push(el.ref.delete());
    });
    yield Promise.all(toDelete);
    const slotsColl = org.collection("slots");
    const Timestamp = firebase_admin_1.default.firestore.Timestamp;
    const toCreate = [
        slotsColl.add({
            date: new Timestamp(day + 9 * 3600, 0),
            type: lodash_1.default.sample(TYPES),
            durations: ["60"],
            categories: lodash_1.default.sampleSize(CATEGORIES, lodash_1.default.random(CATEGORIES.length - 1) + 1),
            notes: lodash_1.default.sample(NOTES),
        }),
        slotsColl.add({
            date: new Timestamp(day + 10 * 3600, 0),
            type: lodash_1.default.sample(TYPES),
            durations: ["60"],
            categories: lodash_1.default.sampleSize(CATEGORIES, lodash_1.default.random(CATEGORIES.length - 1) + 1),
            notes: lodash_1.default.sample(NOTES),
        }),
        slotsColl.add({
            date: new Timestamp(day + 15 * 3600, 0),
            type: lodash_1.default.sample(TYPES),
            durations: ["60", "90", "120"],
            categories: lodash_1.default.sampleSize(CATEGORIES, lodash_1.default.random(CATEGORIES.length - 1) + 1),
            notes: lodash_1.default.sample(NOTES),
        }),
        slotsColl.add({
            date: new Timestamp(day + 17.5 * 3600, 0),
            type: lodash_1.default.sample(TYPES),
            durations: ["60", "90", "120"],
            categories: lodash_1.default.sampleSize(CATEGORIES, lodash_1.default.random(CATEGORIES.length - 1) + 1),
            notes: lodash_1.default.sample(NOTES),
        }),
    ];
    yield Promise.all(toCreate);
    return;
});
exports.createTestSlots = firebase_functions_1.default
    .region("europe-west6")
    .https.onCall(({ organization }, context) => __awaiter(void 0, void 0, void 0, function* () {
    yield utils_1.checkUser(organization, context.auth);
    console.log("Creating test slots...");
    const today = utils_1.roundTo(firebase_admin_1.default.firestore.Timestamp.now().seconds, 86400);
    let daysToFill = [];
    for (let i = -14; i < 15; i++) {
        const day = today + i * 86400;
        daysToFill.push(fillDay(day, organization));
    }
    yield Promise.all(daysToFill);
    return "Test slots created";
}));
//# sourceMappingURL=testSlots.js.map