import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { appReducer } from "./appReducer";
import { notificationsReducer } from "./notificationsReducer";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  app: notificationsReducer,
});

export default rootReducer;
