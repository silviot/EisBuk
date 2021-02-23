import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { ORGANIZATION } from "../../config/envInfo";

const PrivateRoute = (props) => {
  const auth = useSelector((state) => state.firebase.auth);
  const organizationRecord = useSelector(
    (state) => state.firestore.data.organizations
  );
  const isAuthorized =
    isLoaded(organizationRecord) &&
    !isEmpty(organizationRecord) &&
    organizationRecord[ORGANIZATION].admins.includes(auth.email);
  return (
    <>
      {isLoaded(auth) && !isEmpty(auth) && isAuthorized && <Route {...props} />}
      {isLoaded(auth) && isEmpty(auth) && isAuthorized && (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default PrivateRoute;
