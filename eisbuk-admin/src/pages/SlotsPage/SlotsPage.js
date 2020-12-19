import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppbarDrawer from "../../components/layout/AppbarDrawer";
import SlotsPageContainer from "../../containers/SlotsPageContainer";

const SlotsPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppbarDrawer />
      <main className={classes.content}>
        <SlotsPageContainer />
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  }
}));

export default SlotsPage;
