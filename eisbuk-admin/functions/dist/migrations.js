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
exports.migrateSlotsToPluralCategories = void 0;
const functions = __importStar(require("firebase-functions"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("./utils");
exports.migrateSlotsToPluralCategories = functions
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