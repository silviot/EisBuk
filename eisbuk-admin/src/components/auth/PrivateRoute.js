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
  const isAuthorized = isLoaded(organizationRecord) && isLoaded(auth);
  !isEmpty(organizationRecord) &&
    organizationRecord[ORGANIZATION].admins.includes(auth.email);
  console.log(auth, organizationRecord);

  if (
    isLoaded(auth) &&
    isLoaded(organizationRecord) &&
    !isEmpty(auth) &&
    isAuthorized
  ) {
    return <Route {...props} />;
  } else if (
    isLoaded(auth) &&
    !isEmpty(auth) &&
    isLoaded(organizationRecord) &&
    !isAuthorized
  ) {
    console.log(auth);
    return <Unauthorized />;
  }
  if (!isLoaded(auth) || !isLoaded(organizationRecord)) {
    return <Loading />;
  }
  return <Redirect to="/login" />;
};

export default PrivateRoute;
