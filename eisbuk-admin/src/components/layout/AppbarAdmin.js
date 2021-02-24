import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  ButtonGroup,
  Hidden,
  List,
  Menu,
  MenuItem,
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
import { signOut } from "../../store/actions/actions";
import { organizationInfo } from "../../themes";

const AppbarAdmin = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action) => () => {
    switch (action) {
      case "logout":
        dispatch(signOut());
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };

  const currentUserEmail = useSelector((state) => state.firebase.auth.email);
  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            onClick={handleClick}
            className={classes.title}
          >
            {organizationInfo.name}
          </Typography>
          <Menu
            id="admin-actions"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose()}
          >
            <MenuItem onClick={handleClose("")}>{currentUserEmail}</MenuItem>
            <MenuItem onClick={handleClose("logout")}>Logout</MenuItem>
          </Menu>
          <Hidden xsDown>
            <ButtonGroup color="secondary">
              <Button
                component={Link}
                to="/"
                variant="contained"
                disabled={location.pathname === "/"}
                startIcon={<DateRangeIcon />}
              >
                Presenze
              </Button>
              <Button
                component={Link}
                disabled={location.pathname === "/prenotazioni"}
                to="/prenotazioni"
                variant="contained"
                startIcon={<LibraryBooksIcon />}
              >
                Slots
              </Button>
              <Button
                component={Link}
                to="/atleti"
                disabled={location.pathname === "/atleti"}
                variant="contained"
                startIcon={<PeopleIcon />}
              >
                Atleti
              </Button>
              {organizationInfo.name === "DEV" && <DebugMenu {...props} />}
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
