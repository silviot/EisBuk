import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import Unauthorized from "./Unauthorized";
import Loading from "./Loading";
import { ORGANIZATION } from "../../config/envInfo";

const PrivateRoute = (props) => {
  const auth = useSelector((state) => state.firebase.auth);
  const organizationRecord = useSelector(
    (state) => state.firestore.data.organizations
  );
  const isAuthenticated = isLoaded(auth) && !isEmpty(auth);
  const isAuthorized =
    isLoaded(organizationRecord) &&
    !isEmpty(organizationRecord) &&
    isAuthenticated &&
    organizationRecord[ORGANIZATION] &&
    organizationRecord[ORGANIZATION].admins &&
    organizationRecord[ORGANIZATION].admins.includes(auth.email);

  if (!isLoaded(auth)) {
    return <Loading />;
  } else if (
    isAuthenticated &&
    (isAuthorized || typeof organizationRecord === "undefined")
  ) {
    return <Route {...props} />;
  } else if (
    isAuthenticated &&
    !isAuthorized &&
    typeof organizationRecord !== "undefined"
  ) {
    console.log("Was unauthorized");
    return <Unauthorized />;
  } else if (!isAuthenticated && isLoaded(auth)) {
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
