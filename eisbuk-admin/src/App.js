import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import {
  ReactReduxFirebaseProvider,
} from 'react-redux-firebase'

import { rrfProps, store } from "./store/store"
import PrivateRoute from './components/auth/PrivateRoute'
import LoginRoute from './components/auth/LoginRoute'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { blue, lightBlue } from "@material-ui/core/colors"
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import DashboardPage from "./pages/DashboardPage"
import ClientsPage from "./pages/CustomersPage"
import BookingsPage from "./pages/BookingsPage"
import LoginPage from './pages/LoginPage'

import MomentUtils from '@date-io/moment';
import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';
 
Moment.globalMoment = moment;
Moment.globalLocale = 'it';
 
// Set the output format for every react-moment instance.
Moment.globalFormat = 'D MMM YYYY';
 
// Set the timezone for every instance.
Moment.globalTimezone = 'Europe/Rome';
 
// Set the output timezone for local for every instance.
Moment.globalLocal = true;
 
// Use a <span> tag for every react-moment instance.
Moment.globalElement = 'span';
 
// Upper case all rendered dates.
Moment.globalFilter = (d) => {
    return d.toUpperCase();
};

const igorice = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: lightBlue[500],
    },
  },
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 16,
  },
  spacing: 8,
});


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
                      <PrivateRoute path='/clienti' component={ClientsPage} exact />
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
