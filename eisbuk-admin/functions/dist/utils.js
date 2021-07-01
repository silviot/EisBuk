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
exports.fs2luxon = exports.checkUser = exports.roundTo2 = exports.roundTo = void 0;
const firebase_functions_1 = __importDefault(require("firebase-functions"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const luxon_1 = require("luxon");
const roundTo = (val, modbase) => Math.floor(val / modbase) * modbase;
exports.roundTo = roundTo;
const roundTo2 = (val, modbase) => Math.floor(val / modbase) * modbase;
exports.roundTo2 = roundTo2;
const checkUser = (organization, auth) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (auth && auth.token && (auth.token.email || auth.token.phone_number)) {
        const org = yield firebase_admin_1.default
            .firestore()
            .collection("organizations")
            .doc(organization)
            .get();
        if (!hasAdmin((_a = org.data()) === null || _a === void 0 ? void 0 : _a.admins, auth)) {
            throwUnauth();
        }
    }
    else {
        throwUnauth();
    }
});
exports.checkUser = checkUser;
const hasAdmin = (admins, auth) => {
    if (!Array.isArray(admins) || !(auth === null || auth === void 0 ? void 0 : auth.token))
        return false;
    const { email, phone_number: phoneNumber } = auth.token;
    return (email && admins.includes(email)) ||
        (phoneNumber && admins.includes(phoneNumber))
        ? true
        : false;
};
const throwUnauth = () => {
    throw new firebase_functions_1.default.https.HttpsError("permission-denied", "unauthorized", "The function must be called while authenticated with a user that is an admin of the given organization.");
};
const fs2luxon = (fsdate) => {
    return luxon_1.DateTime.fromMillis(fsdate.seconds * 1000);
};
exports.fs2luxon = fs2luxon;
//# sourceMappingURL=utils.js.map