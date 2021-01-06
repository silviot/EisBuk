const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
const { Firestore } = require("@google-cloud/firestore");
const { credentials } = require("@grpc/grpc-js");

const projectId = "eisbuk";

exports.adminDb = new Firestore({
  projectId: projectId,
  servicePath: "localhost",
  port: 8081,
  sslCreds: credentials.createInsecure(),
  customHeaders: {
    Authorization: "Bearer owner",
  },
});

firebase.initializeApp({
  projectId: projectId,
  apiKey: "aaa",
});
firebase.auth().useEmulator("http://localhost:9098/");

exports.db = firebase.firestore();

exports.db.settings({
  host: "localhost:8081",
  ssl: false,
});
