import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";
import _ from "lodash";

const base = {
  palette: {
    absent: colors.brown[200],
  },
  typography: {
    htmlFontSize: 16,
  },
  spacing: 8,
};

export const igorice = _.merge({}, base, {
  palette: {
    primary: {
      main: colors.blue[500],
      constrastText: "#fff",
    },
    secondary: {
      main: colors.lightBlue[900],
    },
    grey: colors.blueGrey,
    absent: colors.brown[200],
  },
});

export const eisbuk = _.merge({}, base, {
  palette: {
    primary: {
      main: colors.orange[600],
    },
    secondary: {
      main: colors.green[200],
    },
  },
});

export const development = _.merge({}, base, {
  palette: {
    type: "dark",
    primary: {
      main: "#b3720c",
    },
    secondary: {
      main: "#3e2723",
    },
  },
});

function getCurrentThemeDefinition() {
  var hostname;
  try {
    hostname = window.location.hostname;
  } catch (e) {
    hostname = "";
  }
  switch (hostname) {
    case "igorice.web.app":
      return igorice;
    case "eisbuk.web.app":
      return eisbuk;
    default:
      return development;
  }
}

export const currentTheme = responsiveFontSizes(
  createMuiTheme(getCurrentThemeDefinition())
);
