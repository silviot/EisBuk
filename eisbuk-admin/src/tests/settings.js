const firebase = require("firebase/app");
require("firebase/firestore");
const { Firestore } = require("@google-cloud/firestore");
const { credentials } = require("@grpc/grpc-js");

exports.adminDb = new Firestore({
  projectId: "my-project-id",
  servicePath: "localhost",
  port: 8081,
  sslCreds: credentials.createInsecure(),
  customHeaders: {
    Authorization: "Bearer owner",
  },
});

const fbConfig = {
  databaseURL: "http://localhost:8080",
  projectId: "eisbuk",
  apiKey: "AIzaSyDfUuakkXb_xV-VFRyH7yIW4Dr7YmypHRo",
  messagingSenderId: "26525409101",
  appId: "1:26525409101:web:53f88cf5f4b7d6883e6104",
};
firebase.initializeApp(fbConfig);
exports.db = firebase.firestore();

exports.db.settings({
  host: "localhost:8081",
  ssl: false,
});
