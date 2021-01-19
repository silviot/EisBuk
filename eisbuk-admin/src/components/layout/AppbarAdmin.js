import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import { BugReport as BugReportIcon } from "@material-ui/icons";
import { People as PeopleIcon } from "@material-ui/icons";
import { LibraryBooks as LibraryBooksIcon } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";

const AppbarAdmin = () => {
  const classes = useStyles();
  console.log("Here i am");
  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Button
            component={Link}
            to="/atleti"
            replace
            startIcon={<PeopleIcon />}
          >
            Atleti
          </Button>
          <Button
            component={Link}
            to="/prenotazioni"
            replace
            startIcon={<LibraryBooksIcon />}
          >
            Prenotazioni
          </Button>
          <Button
            component={Link}
            to="/debug"
            replace
            startIcon={<BugReportIcon />}
          >
            Debug
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ height: "80px" }} />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
}));

export default AppbarAdmin;
