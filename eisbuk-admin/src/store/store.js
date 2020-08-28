import firebase from 'firebase/app'
import 'firebase/auth'
// import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/rootReducer'
import { getFirebase } from 'react-redux-firebase'
// import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore


var fbConfig = {
  apiKey: "AIzaSyA2dS3UiWq8ABNH9ROaQQlTsOkTq5QvCZw",
  authDomain: "eisbuk.firebaseapp.com",
  databaseURL: "https://eisbuk.firebaseio.com",
  projectId: "eisbuk",
  storageBucket: "eisbuk.appspot.com",
  messagingSenderId: "1017581173375",
  appId: "1:1017581173375:web:3c7959139f7d9e9aed1d4a",
  measurementId: "G-39ZGH12ZRF"
}
// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)
console.log(process.env.NODE_ENV)

// Initialize other services on firebase instance
// firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable


// Create store with reducers and initial state
const initialState = window && window.__INITIAL_STATE__ 
const middlewares = [
  thunk.withExtraArgument({getFirebase})
]
export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
}

export default {
    store,
    rrfProps
}