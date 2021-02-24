import React from "react";
import { useSelector } from "react-redux";
import {
  isLoaded,
  isEmpty,
  useFirestoreConnect,
  useFirestore,
} from "react-redux-firebase";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import Unauthorized from "./components/auth/Unauthorized";
import LoginRoute from "./components/auth/LoginRoute";
import DebugPage from "./components/debugPage";
import DashboardPage from "./pages/DashboardPage";
import CustomersPage from "./pages/CustomersPage";
import SlotsPage from "./pages/SlotsPage";
import LoginPage from "./pages/LoginPage";
import CustomerAreaPage from "./pages/CustomerAreaPage";
import { wrapOrganization } from "./utils/firestore";
import { getMonthStr } from "./utils/helpers";
import { ORGANIZATION } from "./config/envInfo";
import { calendarDaySelector } from "./store/selectors";

function AppContentAuthenticated() {
  const currentDate = useSelector(calendarDaySelector);
  const firestore = useFirestore();
  const monthsToQuery = [
    getMonthStr(currentDate, -1),
    getMonthStr(currentDate, 0),
    getMonthStr(currentDate, 1),
  ];
  useFirestoreConnect([
    wrapOrganization({ collection: "customers" }),
    wrapOrganization({
      collection: "slotsByDay",
      where: [firestore.FieldPath.documentId(), "in", monthsToQuery],
    }),
    wrapOrganization({
      collection: "bookingsByDay",
      where: [firestore.FieldPath.documentId(), "in", monthsToQuery],
    }),
    {
      collection: "organizations",
      doc: ORGANIZATION,
    },
  ]);
  return AppComponents();
}

function AppComponents() {
  return (
    <Switch>
      <LoginRoute path="/login" component={LoginPage} />
      <PrivateRoute path="/" component={DashboardPage} exact />
      <PrivateRoute path="/atleti" component={CustomersPage} exact />
      <PrivateRoute path="/prenotazioni" component={SlotsPage} exact />
      <Route path="/unauthorized" component={Unauthorized} exact />
      <Route path="/clienti/:secret_key" children={<CustomerAreaPage />} />
      <Route path="/debug" children={<DebugPage />} />
    </Switch>
  );
}

function AppContent() {
  const auth = useSelector((state) => state.firebase.auth);
  if (isLoaded(auth) && !isEmpty(auth)) {
    // The user is authenticated: it makes sense to query protected collections
    // that are used all over the application
    return <AppContentAuthenticated />;
  } else {
    // Anonymous user: do not attempt to query collections that would fail with
    // unauthorized. Only render subcomponents
    return <AppComponents />;
  }
}

export default AppContent;
