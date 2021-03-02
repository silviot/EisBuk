import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import Unauthorized from "./Unauthorized";
import Loading from "./Loading";

const PrivateRoute = (props) => {
  const auth = useSelector((state) => state.firebase.auth);
  const amIAdmin = useSelector((state) => state.authInfoEisbuk.amIAdmin);

  if (!isLoaded(auth)) {
    return <Loading />;
  } else if (amIAdmin && !isEmpty(auth)) {
    return <Route {...props} />;
  } else if (!amIAdmin && !isEmpty(auth)) {
    return <Unauthorized />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
