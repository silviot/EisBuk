import React from "react";
import AppbarDrawer from "./AppbarDrawer";
import { makeStyles } from "@material-ui/core/styles";
import AttendancePage from "../pages/AttendancePage";

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppbarDrawer />
      <AttendancePage />
      {{ children }}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export default Layout;
