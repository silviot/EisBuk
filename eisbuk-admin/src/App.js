import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { rrfProps, store } from "./store/store";

import PrivateRoute from "./components/auth/PrivateRoute";
import LoginRoute from "./components/auth/LoginRoute";
import DebugPage from "./components/debugPage";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "moment/locale/it";

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
    // Tell Material-UI what's the font-size on the html element is.
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
          <MuiPickersUtilsProvider
            libInstance={moment}
            utils={MomentUtils}
            locale="it"
          >
            <SnackbarProvider maxSnack={3}>
              <Notifier />
              <CssBaseline />
              <BrowserRouter>
                <Switch>
                  <PrivateRoute path="/" component={DashboardPage} exact />
                  <PrivateRoute
                    path="/clienti"
                    component={CustomersPage}
                    exact
                  />
                  <PrivateRoute
                    path="/prenotazioni"
                    component={SlotsPage}
                    exact
                  />
                  <LoginRoute path="/login" component={LoginPage} />
                  <Route path="/clienti/:id" children={<CustomerAreaPage />} />
                  <Route path="/debug" children={<DebugPage />} />
                </Switch>
              </BrowserRouter>
            </SnackbarProvider>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
