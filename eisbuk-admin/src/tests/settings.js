import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Firestore } from "@google-cloud/firestore";
import { credentials } from "@grpc/grpc-js";

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
