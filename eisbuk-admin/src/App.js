import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import setup_firebase from "./config/firebase-conf";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import { blue, lightBlue } from "@material-ui/core/colors"

import DashboardPage from "./pages/Dashboard"
import LoginPage from './pages/Login'

setup_firebase();

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
      <CssBaseline />
      <BrowserRouter>
        <Switch>  
          <Route path='/dashboard' component={DashboardPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/'>
            <Redirect to="/dashboard" /> 
          </Route>
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

export default App;
