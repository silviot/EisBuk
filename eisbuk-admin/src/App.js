import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import {
  ReactReduxFirebaseProvider,
} from 'react-redux-firebase'

import { rrfProps, store } from "./store/store"
import PrivateRoute from './components/PrivateRoute'
import LoginRoute from './components/LoginRoute'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import { blue, lightBlue } from "@material-ui/core/colors"

import DashboardPage from "./pages/DashboardPage"
import ClientsPage from "./pages/ClientsPage"
import BookingsPage from "./pages/BookingsPage"
import LoginPage from './pages/LoginPage'


const igorice = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: lightBlue[500],
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={igorice}>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <CssBaseline />
            <BrowserRouter>
              <Switch>
                <PrivateRoute path='/' component={DashboardPage} exact />
                <PrivateRoute path='/clienti' component={ClientsPage} exact />
                <PrivateRoute path='/prenotazioni' component={BookingsPage} exact />
                <LoginRoute path='/login' component={LoginPage} />
              </Switch>
            </BrowserRouter>
          </ReactReduxFirebaseProvider>
      </Provider>
    </MuiThemeProvider>
  )
}

export default App;
