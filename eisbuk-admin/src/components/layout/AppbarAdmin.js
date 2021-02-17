import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  ButtonGroup,
  Hidden,
  List,
  Toolbar,
  Typography,
  SwipeableDrawer,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  People as PeopleIcon,
  LibraryBooks as LibraryBooksIcon,
  DateRange as DateRangeIcon,
  Menu as MenuIcon,
} from "@material-ui/icons";
import DebugMenu from "./DebugMenu";
import { getCurrentOrganizationSettings } from "../../themes";

const AppbarAdmin = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const currentOrganizationSettings = getCurrentOrganizationSettings();
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            {currentOrganizationSettings.name}
          </Typography>
          <Hidden xsDown>
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
                disabled={location.pathname === "/prenotazioni"}
                to="/prenotazioni"
                variant="contained"
                replace
                startIcon={<LibraryBooksIcon />}
              >
                Slots
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
              {currentOrganizationSettings.name === "DEV" && (
                <DebugMenu {...props} />
              )}
            </ButtonGroup>
          </Hidden>
          <Hidden smUp>
            <Button onClick={() => setDrawerOpen(drawerOpen ? false : true)}>
              <MenuIcon />
            </Button>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Hidden smUp>
        <SwipeableDrawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onOpen={() => setDrawerOpen(true)}
        >
          <List className={classes.drawer}>
            <ListItem
              button
              component={Link}
              to="/"
              disabled={location.pathname === "/"}
            >
              <ListItemIcon>
                <DateRangeIcon />
              </ListItemIcon>
              <ListItemText primary="Presenze" />
            </ListItem>
            <ListItem
              button
              component={Link}
              disabled={location.pathname === "/prenotazioni"}
              to="/prenotazioni"
            >
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary="Prenotazioni" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/atleti"
              disabled={location.pathname === "/atleti"}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Atleti" />
            </ListItem>
          </List>
        </SwipeableDrawer>
      </Hidden>
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
  drawer: {
    width: 250,
  },
}));

export default AppbarAdmin;
