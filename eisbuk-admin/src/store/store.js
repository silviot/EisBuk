import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import { createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/rootReducer'
import { getFirebase } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'

if (process.env.NODE_ENV === "development") {
  var fbConfig = {
    apiKey: "AIzaSyDfUuakkXb_xV-VFRyH7yIW4Dr7YmypHRo",
    authDomain: "eisbuk-e6b2a.firebaseapp.com",
    databaseURL: "https://eisbuk-e6b2a.firebaseio.com",
    projectId: "eisbuk-e6b2a",
    storageBucket: "eisbuk-e6b2a.appspot.com",
    messagingSenderId: "26525409101",
    appId: "1:26525409101:web:53f88cf5f4b7d6883e6104"
  }
  console.log('DEV Database : ' +  fbConfig.projectId)
}
else {
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
}

// react-redux-firebase Configuration
const rrfConfig = {
  //userProfile: 'users'
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

// Initialize Firebase, Firestore and Functions instances
firebase.initializeApp(fbConfig)
firebase.firestore()
firebase.functions()


// Create Redux Store with Reducers and Initial state
const initialState = window && window.__INITIAL_STATE__ 
const middlewares = [
  thunk.withExtraArgument({getFirebase})
]
export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

// Export Redux Store and react-redux-firebase props
export default {
    store,
    rrfProps
}