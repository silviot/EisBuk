import { GOOGLE_LOGIN_ERROR, GOOGLE_LOGIN_SUCCESS } from "./action-types";

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        console.log("Login Success");
      })
      .catch((err) => {
        console.log("Login Error");
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Logout success");
      })
      .catch((err) => {
        console.log("Logout error");
      });
  };
};

export const signInWithGoogle = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .login({ provider: "google", type: "popup" })
      .then(() => {
        console.log("Google login success");
        dispatch({ type: GOOGLE_LOGIN_SUCCESS });
      })
      .catch((err) => {
        console.log("Google login error");
        dispatch({ type: GOOGLE_LOGIN_ERROR, err });
      });
  };
};

export const createSlot = (data) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("slots")
      .add(data)
      .then(() => {
        console.log("Slot added");
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  };
};

export const deleteSlot = (id) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("slots")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Eliminato");
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  };
};

export const createCustomer = (customer) => {
  return (dispatch, getState, { getFirebase }) => {
    console.log(customer);
    const firebase = getFirebase();
    firebase.firestore().collection("customers").add(customer);
  };
};

export const deleteCustomer = (id) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("customers")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Eliminato");
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  };
};

export const updateCustomer = (customer) => {
  return (dispatch, getState, { getFirebase }) => {
    const updatedData = Object.assign({}, customer);
    delete updatedData.id;
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("customers")
      .doc(customer.id)
      .update(updatedData)
      .then(() => {
        console.log("Aggiornato");
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
    console.log(updatedData);
  };
};
