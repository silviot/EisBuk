import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  GOOGLE_LOGIN_ERROR,
  GOOGLE_LOGIN_SUCCESS,
  IS_LOADING,
  HAS_LOADED,
} from "./action-types";

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

export const createBookingSlot = ({ dateTime, duration }) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .firestore()
      .collection("bookings")
      .add({
        date: dateTime,
        duration: duration,
      })
      .then((err) => {
        console.log("Error : " + err);
      });
  };
};

export const deleteBookingSlot = (id) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("bookings")
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
    const { name, surname, email, phone, subscription, level } = customer;
    console.log(customer);
    const firebase = getFirebase();
    firebase.firestore().collection("customers").add({
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      subscription: subscription,
      level: level,
    });
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
