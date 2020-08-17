import firebase from "firebase";

const setup_firebase = function () {
  firebase.initializeApp(firebaseConfig);
  if (process.env.NODE_ENV === 'development') {
    console.log("Using stubbed service")
    firebase.app().functions("europe-west6").useFunctionsEmulator('http://localhost:5001');
    // For debug purposes, we expose the firebase interface in the window object
    window.firebase = firebase;
  }
  };

const firebaseConfig = {
  apiKey: "AIzaSyA2dS3UiWq8ABNH9ROaQQlTsOkTq5QvCZw",
  authDomain: "eisbuk.firebaseapp.com",
  databaseURL: "https://eisbuk.firebaseio.com",
  projectId: "eisbuk",
  storageBucket: "eisbuk.appspot.com",
  messagingSenderId: "1017581173375",
  appId: "1:1017581173375:web:3c7959139f7d9e9aed1d4a",
  measurementId: "G-39ZGH12ZRF",
};

export default setup_firebase;
