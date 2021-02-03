import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import LoginRoute from "./components/auth/LoginRoute";
import DebugPage from "./components/debugPage";
import DashboardPage from "./pages/DashboardPage";
import CustomersPage from "./pages/CustomersPage";
import SlotsPage from "./pages/SlotsPage";
import LoginPage from "./pages/LoginPage";
import CustomerAreaPage from "./pages/CustomerAreaPage";
import { wrapOrganization } from "./utils/firestore";
import { getMonthStr } from "./utils/helpers";
import { calendarDaySelector } from "./store/selectors";

function AppContent(props) {
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
  ]);

  return (
    <Switch>
      <LoginRoute path="/login" component={LoginPage} />
      <PrivateRoute path="/" component={DashboardPage} exact />
      <PrivateRoute path="/atleti" component={CustomersPage} exact />
      <PrivateRoute path="/prenotazioni" component={SlotsPage} exact />
      <Route path="/clienti/:secret_key" children={<CustomerAreaPage />} />
      <Route path="/debug" children={<DebugPage />} />
    </Switch>
  );
}

export default AppContent;
