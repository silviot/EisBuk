import React from "react";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import { rrfProps, store } from "./store/store";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";

import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { blue, lightBlue, blueGrey, brown } from "@material-ui/core/colors";

import { SnackbarProvider } from "notistack";
import AppContent from "./AppContent";
import Notifier from "./utils/Notifier";

export var igorice = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
      constrastText: "#fff",
    },
    secondary: {
      main: lightBlue[900],
    },
    grey: blueGrey,
    absent: brown[200],
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
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <SnackbarProvider maxSnack={3}>
              <Notifier />
              <CssBaseline />
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </SnackbarProvider>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
