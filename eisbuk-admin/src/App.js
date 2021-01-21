import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { rrfProps, store } from "./store/store";

import PrivateRoute from "./components/auth/PrivateRoute";
import LoginRoute from "./components/auth/LoginRoute";
import DebugPage from "./components/debugPage";

import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { blue, lightBlue, blueGrey } from "@material-ui/core/colors";

import { SnackbarProvider } from "notistack";
import Notifier from "./utils/Notifier";

import DashboardPage from "./pages/DashboardPage";
import CustomersPage from "./pages/CustomersPage";
import SlotsPage from "./pages/SlotsPage";
import LoginPage from "./pages/LoginPage";
import CustomerAreaPage from "./pages/CustomerAreaPage";

let igorice = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
      constrastText: "#fff",
    },
    secondary: {
      main: lightBlue[900],
    },
    grey: blueGrey,
  },
  typography: {
    htmlFontSize: 16,
  },
  spacing: 8,
});
igorice = responsiveFontSizes(igorice);

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <ThemeProvider theme={igorice}>
          <SnackbarProvider maxSnack={3}>
            <Notifier />
            <CssBaseline />
            <BrowserRouter>
              <Switch>
                <LoginRoute path="/login" component={LoginPage} />
                <PrivateRoute path="/" component={DashboardPage} exact />
                <PrivateRoute path="/atleti" component={CustomersPage} exact />
                <PrivateRoute
                  path="/prenotazioni"
                  component={SlotsPage}
                  exact
                />
                <Route
                  path="/clienti/:secret_key"
                  children={<CustomerAreaPage />}
                />
                <Route path="/debug" children={<DebugPage />} />
              </Switch>
            </BrowserRouter>
          </SnackbarProvider>
        </ThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
