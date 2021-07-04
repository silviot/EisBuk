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
exports.createOrganization = exports.ping = exports.createTestData = void 0;
const functions = __importStar(require("firebase-functions"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const luxon_1 = require("luxon");
const lodash_1 = __importDefault(require("lodash"));
const uuid_1 = require("uuid");
const enums_1 = require("./types/enums");
const utils_1 = require("./utils");
const FIRST_NAMES = __importStar(require("./assets/italian-names.json"));
const LAST_NAMES = __importStar(require("./assets/italian-surnames.json"));
const uuidv4 = uuid_1.v4;
exports.createTestData = functions
    .region("europe-west6")
    .https.onCall(({ numUsers = 1, organization }, context) => __awaiter(void 0, void 0, void 0, function* () {
    yield utils_1.checkUser(organization, context.auth);
    functions.logger.info(`Creating ${numUsers} test users`);
    functions.logger.error(`Creating ${numUsers} test users`);
    yield createUsers(numUsers, organization);
    return { success: true };
}));
exports.ping = functions.region("europe-west6").https.onCall((data) => {
    console.log("ping invoked");
    return { pong: true, data: Object.assign({}, data) };
});
exports.createOrganization = functions
    .region("europe-west6")
    .https.onCall(({ organization }) => {
    const db = firebase_admin_1.default.firestore();
    return db
        .collection("organizations")
        .doc(organization)
        .set({
        admins: ["test@eisbuk.it", "+39123"],
    });
});
const createUsers = (numUsers, organization) => __awaiter(void 0, void 0, void 0, function* () {
    const db = firebase_admin_1.default.firestore();
    const org = db.collection("organizations").doc(organization);
    lodash_1.default.range(numUsers).map(() => __awaiter(void 0, void 0, void 0, function* () {
        const name = lodash_1.default.sample(FIRST_NAMES);
        const surname = lodash_1.default.sample(LAST_NAMES);
        const customer = {
            id: uuidv4(),
            birthday: "2000-01-01",
            name,
            surname,
            email: toEmail(`${name}.${surname}@example.com`.toLowerCase()),
            phone: "12345",
            category: lodash_1.default.sample(Object.values(enums_1.Categories)),
            certificateExpiration: luxon_1.DateTime.local()
                .plus({ days: lodash_1.default.random(-40, 200) })
                .toISODate(),
        };
        yield org.collection("customers").doc(customer.id).set(customer);
    }));
});
const toEmail = (str) => lodash_1.default.deburr(str.replace(/ /i, "."));
//# sourceMappingURL=testData.js.map