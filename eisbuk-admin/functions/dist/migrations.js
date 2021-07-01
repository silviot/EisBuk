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
exports.migrateSlotsToPluralCategories = void 0;
const firebase_functions_1 = __importDefault(require("firebase-functions"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("./utils");
exports.migrateSlotsToPluralCategories = firebase_functions_1.default
    .region("europe-west6")
    .https.onCall(({ organization }, context) => __awaiter(void 0, void 0, void 0, function* () {
    yield utils_1.checkUser(organization, context.auth);
    const org = firebase_admin_1.default.firestore().collection("organizations").doc(organization);
    const existing = yield org.collection("slots").get();
    let operations = [];
    existing.forEach((el) => {
        const slotData = el.data();
        if (slotData.category) {
            const newData = Object.assign(Object.assign({}, lodash_1.default.omit(slotData, "category")), { categories: [slotData.category] });
            operations.push(org.collection("slots").doc(el.id).set(newData));
        }
    });
    console.log(`Updating ${operations.length} records`);
    yield Promise.all(operations);
    console.log(`Finished: ${operations.length} records updated`);
}));
//# sourceMappingURL=migrations.js.map