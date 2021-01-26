import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar } from "@material-ui/core";
import {
  People as PeopleIcon,
  LibraryBooks as LibraryBooksIcon,
} from "@material-ui/icons";
import DebugMenu from "./DebugMenu";

const AppbarAdmin = (props) => {
  const classes = useStyles();
  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Button
            component={Link}
            to="/"
            color="primary"
            variant="contained"
            replace
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to="/atleti"
            color="primary"
            variant="contained"
            replace
            startIcon={<PeopleIcon />}
          >
            Atleti
          </Button>
          <Button
            component={Link}
            to="/prenotazioni"
            variant="contained"
            color="primary"
            replace
            startIcon={<LibraryBooksIcon />}
          >
            Prenotazioni
          </Button>
          <DebugMenu {...props} />
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
