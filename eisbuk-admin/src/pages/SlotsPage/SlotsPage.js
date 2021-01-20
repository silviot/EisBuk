import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SlotsPageContainer from "../../containers/SlotsPageContainer";
import AppbarAdmin from "../../components/layout/AppbarAdmin";

const SlotsPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppbarAdmin />
      <main className={classes.content}>
        <SlotsPageContainer />
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({}));

export default SlotsPage;
