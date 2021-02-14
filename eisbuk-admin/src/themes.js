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
    primary: {
      main: colors.orange[900],
    },
    secondary: {
      main: colors.grey[900],
    },
  },
});

export const available = [igorice, eisbuk, development];

export function getCurrentOrganizationSettings() {
  var hostname;
  try {
    hostname = window.location.hostname;
  } catch (e) {
    hostname = "";
  }
  switch (hostname) {
    case "igorice.web.app":
      return {
        theme: igorice,
        name: "IgorIce",
      };
    case "eisbuk.web.app":
      return {
        theme: eisbuk,
        name: "EisBuk",
      };
    default:
      return {
        theme: development,
        name: "DEV",
      };
  }
}

const organizationTheme = getCurrentOrganizationSettings();

export const currentTheme = responsiveFontSizes(
  createMuiTheme(organizationTheme.theme)
);
