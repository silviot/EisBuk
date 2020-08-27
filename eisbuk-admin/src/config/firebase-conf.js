import firebase from "firebase";

const setup_firebase = function () {
  var firebaseConfig = {
    projectId: "eisbuk",
  };

  if (process.env.NODE_ENV === "development") {
    console.log("Using stubbed database");
    firebaseConfig.apiKey = "owner";
    firebaseConfig.authDomain = "eisbuk.firebaseapp.com";
    firebaseConfig.databaseURL = "http://localhost:9000?ns=eisbuk";
  } else {
    firebaseConfig.apiKey = "AIzaSyA2dS3UiWq8ABNH9ROaQQlTsOkTq5QvCZw";
    firebaseConfig.authDomain = "eisbuk.firebaseapp.com";
    firebaseConfig.databaseURL = "https://eisbuk.firebaseio.com";
    firebaseConfig.storageBucket = "eisbuk.appspot.com";
    firebaseConfig.messagingSenderId = "1017581173375";
    firebaseConfig.appId = "1:1017581173375:web:3c7959139f7d9e9aed1d4a";
    firebaseConfig.measurementId = "G-39ZGH12ZRF";
  }

  firebase.initializeApp(firebaseConfig);

  if (process.env.NODE_ENV === "development") {
    console.log("Using emulators for functions and firestore");
    firebase
      .app()
      .functions("europe-west6")
      .useFunctionsEmulator("http://localhost:5001");
    // For debug purposes, we expose the firebase interface in the window object
    window.firebase = firebase;
    // Firebase previously initialized using firebase.initializeApp().
    const firestore = firebase.firestore();
    firestore.settings({
      host: "localhost:8080",
      ssl: false,
    });
  }
};

export default setup_firebase;
