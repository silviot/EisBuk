import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import {
  ReactReduxFirebaseProvider,
} from 'react-redux-firebase'

import { rrfProps, store } from "./store/store"
import PrivateRoute from './components/auth/PrivateRoute'
import LoginRoute from './components/auth/LoginRoute'

import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { blue, lightBlue, blueGrey } from "@material-ui/core/colors"


import DashboardPage from "./pages/DashboardPage"
import CustomersPage from "./pages/CustomersPage"
import BookingsPage from "./pages/BookingsPage"
import LoginPage from './pages/LoginPage'
import moment from "moment";
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "moment/locale/it";

let igorice = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
      constrastText: '#fff'
    },
    secondary: {
      main: lightBlue[900],
    },
    grey: blueGrey
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
              <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale='it'>
                  <CssBaseline />
                  <BrowserRouter>
                    <Switch>
                      <PrivateRoute path='/' component={DashboardPage} exact />
                      <PrivateRoute path='/clienti' component={CustomersPage} exact />
                      <PrivateRoute path='/prenotazioni' component={BookingsPage} exact />
                      <LoginRoute path='/login' component={LoginPage} />
                    </Switch>
                  </BrowserRouter>
                </MuiPickersUtilsProvider>
            </ThemeProvider>
          </ReactReduxFirebaseProvider>
      </Provider>
  )
}

export default App;
