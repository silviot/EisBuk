import React from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../../store/actions/actions";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import TodayIcon from "@material-ui/icons/Today";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";

const AppbarDrawer = ({ signOut }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const mainListItems = (
    <div>
      <Link to="/" style={{ textDecoration: "none", color: "initial" }}>
        <ListItem button className={classes.drawerLinkItem}>
          <ListItemIcon>
            <DashboardIcon className={classes.drawerLinkItem} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <Link
        to="/prenotazioni"
        style={{ textDecoration: "none", color: "initial" }}
      >
        <ListItem button className={classes.drawerLinkItem}>
          <ListItemIcon>
            <TodayIcon className={classes.drawerLinkItem} />
          </ListItemIcon>
          <ListItemText primary="Prenotazioni" />
        </ListItem>
      </Link>
      <Link to="/atleti" style={{ textDecoration: "none", color: "initial" }}>
        <ListItem button className={classes.drawerLinkItem}>
          <ListItemIcon>
            <PeopleIcon className={classes.drawerLinkItem} />
          </ListItemIcon>
          <ListItemText primary="Atleti" />
        </ListItem>
      </Link>
    </div>
  );
  return (
    <>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
      </Drawer>
    </>
  );
};

const useStyles = makeStyles((theme) => ({}));

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(AppbarDrawer);
