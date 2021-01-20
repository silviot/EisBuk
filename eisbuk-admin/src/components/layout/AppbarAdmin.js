import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import { People as PeopleIcon } from "@material-ui/icons";
import { LibraryBooks as LibraryBooksIcon } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
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
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default AppbarAdmin;
