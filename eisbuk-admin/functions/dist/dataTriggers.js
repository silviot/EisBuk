"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.aggregateBookings = exports.aggregateSlots = exports.addMissingSecretKey = void 0;
const functions = __importStar(require("firebase-functions"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const uuid_1 = require("uuid");
const luxon_1 = require("luxon");
const utils_1 = require("./utils");
const uuidv4 = uuid_1.v4;
exports.addMissingSecretKey = functions
    .region("europe-west6")
    .firestore.document("organizations/{organization}/customers/{customerId}")
    .onWrite((change, context) => __awaiter(void 0, void 0, void 0, function* () {
    const db = firebase_admin_1.default.firestore();
    const before = change.before.data();
    if (change.after.exists) {
        const after = change.after.data();
        const secretKey = (after === null || after === void 0 ? void 0 : after.secret_key) || uuidv4();
        const bookingsRoot = Object.assign(Object.assign(Object.assign({ customer_id: context.params.customerId }, (after.name && { name: after.name })), (after.surname && { surname: after.surname })), (after.category && { category: after.category }));
        yield db
            .collection("organizations")
            .doc(context.params.organization)
            .collection("bookings")
            .doc(secretKey)
            .set(bookingsRoot);
        return after.secret_key
            ? null
            : change.after.ref.update({ secret_key: secretKey });
    }
    else if (before && !change.before) {
        return change.after;
    }
    return change.after;
}));
exports.aggregateSlots = functions
    .region("europe-west6")
    .firestore.document("organizations/{organization}/slots/{slotId}")
    .onWrite((change, context) => __awaiter(void 0, void 0, void 0, function* () {
    const db = firebase_admin_1.default.firestore();
    let luxonDay, newSlot;
    const { id } = change.before || change.after;
    if (change.after.exists) {
        newSlot = change.after.data();
        newSlot.id =
            change.after.id;
        luxonDay = luxon_1.DateTime.fromJSDate(new Date(newSlot.date.seconds * 1000));
    }
    else {
        luxonDay = luxon_1.DateTime.fromJSDate(new Date(change.before.data().date.seconds * 1000));
        newSlot = firebase_admin_1.default.firestore.FieldValue.delete();
    }
    const monthStr = luxonDay.toISO().substring(0, 7);
    const dayStr = luxonDay.toISO().substring(0, 10);
    yield db
        .collection("organizations")
        .doc(context.params.organization)
        .collection("slotsByDay")
        .doc(monthStr)
        .set({ [dayStr]: { [id]: newSlot } }, { merge: true });
    return change.after;
}));
exports.aggregateBookings = functions
    .region("europe-west6")
    .firestore.document("organizations/{organization}/bookings/{secretKey}/data/{bookingId}")
    .onWrite((change, context) => __awaiter(void 0, void 0, void 0, function* () {
    const db = firebase_admin_1.default.firestore();
    const userData = (yield db
        .collection("organizations")
        .doc(context.params.organization)
        .collection("bookings")
        .doc(context.params.secretKey)
        .get()).data();
    const customerId = userData.customer_id;
    const isUpdate = change.after.exists;
    const bookingData = isUpdate ? change.after.data() : change.before.data();
    const luxonDay = utils_1.fs2luxon(bookingData.date);
    const monthStr = luxonDay.toISO().substring(0, 7);
    const fieldValue = isUpdate
        ? bookingData.duration
        : firebase_admin_1.default.firestore.FieldValue.delete();
    if (!change.after.exists)
        console.log("deleting");
    return db
        .collection("organizations")
        .doc(context.params.organization)
        .collection("bookingsByDay")
        .doc(monthStr)
        .set({ [bookingData.id]: { [customerId]: fieldValue } }, { merge: true });
}));
//# sourceMappingURL=dataTriggers.js.map