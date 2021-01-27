import React from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, ButtonGroup, Toolbar } from "@material-ui/core";
import {
  People as PeopleIcon,
  LibraryBooks as LibraryBooksIcon,
} from "@material-ui/icons";
import DebugMenu from "./DebugMenu";

const AppbarAdmin = (props) => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <ButtonGroup color="secondary">
            <Button
              component={Link}
              to="/"
              variant="contained"
              disabled={location.pathname === "/"}
              replace
            >
              Dashboard
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
              Prenotazioni
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
  button: {
    margin: theme.spacing(2),
  },
}));

export default AppbarAdmin;
