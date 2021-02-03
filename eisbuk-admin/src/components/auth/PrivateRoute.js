import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

const authSelector = (state) => state.firebase.auth;

const PrivateRoute = (props) => {
  const auth = useSelector(authSelector);
  return (
    <>
      {isLoaded(auth) && !isEmpty(auth) && <Route {...props} />}
      {isLoaded(auth) && isEmpty(auth) && <Redirect to="/login" />}
    </>
  );
};

export default PrivateRoute;
