import {
  GOOGLE_LOGIN_ERROR,
  GOOGLE_LOGIN_SUCCESS,
  ENQUEUE_SNACKBAR,
  CLOSE_SNACKBAR,
  REMOVE_SNACKBAR,
} from "./action-types";

import React from "react";
import Button from "@material-ui/core/Button";

export const enqueueSnackbar = (notification) => {
  const key = notification.options && notification.options.key;

  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
};

export const closeSnackbar = (key) => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const removeSnackbar = (key) => ({
  type: REMOVE_SNACKBAR,
  key,
});

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch(
          enqueueSnackbar({
            message: "Hai effettuato il login",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          })
        );
      })
      .catch((err) => {
        dispatch(
          enqueueSnackbar({
            message: "Autenticazione negata",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "error",
            },
          })
        );
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
        dispatch(
          enqueueSnackbar({
            message: "Hai effettuato il logout",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          })
        );
      })
      .catch((err) => {
        dispatch(
          enqueueSnackbar({
            message: "Si è verificato un errore",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "error",
            },
          })
        );
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
        dispatch(
          enqueueSnackbar({
            message: "Slot Aggiunto",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          })
        );
      })
      .catch((err) => {
        dispatch(
          enqueueSnackbar({
            message: "Errore",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "error",
            },
          })
        );
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
        dispatch(
          enqueueSnackbar({
            message: "Slot Eliminato",
            options: {
              key: new Date().getTime() + Math.random(),
            },
          })
        );
      })
      .catch((err) => {
        dispatch(
          enqueueSnackbar({
            message: "Errore",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "error",
            },
          })
        );
      });
  };
};

export const createCustomer = (customer) => {
  return (dispatch, getState, { getFirebase }) => {
    console.log(customer);
    const firebase = getFirebase();
    firebase
      .firestore()
      .collection("customers")
      .add(customer)
      .then(() => {
        dispatch(
          enqueueSnackbar({
            message: "Atleta aggiunto",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          })
        );
      })
      .catch((err) => {
        dispatch(
          enqueueSnackbar({
            message: "Errore",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "error",
            },
          })
        );
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
        dispatch(
          enqueueSnackbar({
            message: "Atleta rimosso",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          })
        );
      })
      .catch((err) => {
        dispatch(
          enqueueSnackbar({
            message: "Errore",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "error",
            },
          })
        );
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
