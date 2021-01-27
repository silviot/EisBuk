import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { appReducer } from "./appReducer";
import copyPasteReducer from "./copyPasteReducer";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  app: appReducer,
  copyPaste: copyPasteReducer,
});

export default rootReducer;
