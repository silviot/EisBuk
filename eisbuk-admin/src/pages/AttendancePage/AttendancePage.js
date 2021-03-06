import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppbarAdmin from "../../components/layout/AppbarAdmin";
import { useTitle } from "../../utils/helpers";
import AttendanceContainer from "../../containers/AttendanceContainer";

const AttendancePage = () => {
  const classes = useStyles();
  useTitle("Prenotazioni");
  return (
    <div className={classes.root}>
      <AppbarAdmin />
      <AttendanceContainer />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

export default AttendancePage;
