import React from "react"
import firebase from "firebase";

import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

import Copyright from "../../components/layout/Copyright"
import AppbarDrawer from '../../components/layout/AppbarDrawer'

const DashboardPage = () => {
  const classes = useStyles();
  const howManyUsersField = (
    <TextField
      id="standard-number"
      label="Number"
      type="number"
      defaultValue="1"
    />
  );
  const create_users_button = (event) => {
    const howMany = 1; // How tf do you extract the value from a Material UI TextField?
    firebase
      .app()
      .functions("europe-west6")
      .httpsCallable("createTestData")({ howMany: howMany })
      .then((result) => console.log(result));
  };

  return (
    <div className={classes.root}>
      <AppbarDrawer />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h1" className={classes.pageTitle}>Dashboard</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
              <Typography variant="h3">Prenotazioni</Typography>
              </Paper>
            </Grid>
            {/* Bookings */}
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
              <Typography variant="h3">Clienti</Typography>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.secondary.main
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  pageTitle: {
    color: theme.palette.primary.contrastText
  }
}));

/* const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
} */

/* export default connect(null, mapDispatchToProps)(DashboardPage) */

export default DashboardPage