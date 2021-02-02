import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DateNavigationAppBar from "../../containers/DateNavigationAppBar";
import BookingsByDay from "../../components/BookingsByDay";

import AppbarAdmin from "../../components/layout/AppbarAdmin";

const DashboardPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <AppbarAdmin />
        <DateNavigationAppBar jump="day" />
        <BookingsByDay />
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

/* const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
} */

/* export default connect(null, mapDispatchToProps)(DashboardPage) */

export default DashboardPage;
