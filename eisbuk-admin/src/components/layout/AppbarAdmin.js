import React from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  ButtonGroup,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  People as PeopleIcon,
  LibraryBooks as LibraryBooksIcon,
  DateRange as DateRangeIcon,
} from "@material-ui/icons";
import DebugMenu from "./DebugMenu";
import { getCurrentOrganizationSettings } from "../../themes";

const AppbarAdmin = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const currentOrganizationName = getCurrentOrganizationSettings();
  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            {currentOrganizationName.name}
          </Typography>
          <ButtonGroup color="secondary">
            <Button
              component={Link}
              to="/"
              variant="contained"
              disabled={location.pathname === "/"}
              replace
              startIcon={<DateRangeIcon />}
            >
              Presenze
            </Button>
            <Button
              component={Link}
              to="/atleti"
              disabled={location.pathname === "/atleti"}
              variant="contained"
              replace
              startIcon={<PeopleIcon />}
            >
              Atleti
            </Button>
            <Button
              component={Link}
              disabled={location.pathname === "/prenotazioni"}
              to="/prenotazioni"
              variant="contained"
              replace
              startIcon={<LibraryBooksIcon />}
            >
              Slots
            </Button>
            <DebugMenu {...props} />
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <div style={{ height: "80px" }} />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(2),
  },
}));

export default AppbarAdmin;
