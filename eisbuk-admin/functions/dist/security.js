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
exports.amIAdmin = void 0;
const firebase_functions_1 = __importDefault(require("firebase-functions"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
exports.amIAdmin = firebase_functions_1.default
    .region("europe-west6")
    .https.onCall(({ organization }, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (!context.auth)
        return { amIAdmin: false };
    const org = (yield firebase_admin_1.default
        .firestore()
        .collection("organizations")
        .doc(organization)
        .get()).data();
    const amIAdmin = org &&
        org.admins &&
        (org.admins.includes(context.auth.token.email) ||
            org.admins.includes(context.auth.token.phone_number));
    return { amIAdmin };
}));
//# sourceMappingURL=security.js.map