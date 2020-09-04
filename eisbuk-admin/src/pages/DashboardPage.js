import React from "react"
import firebase from "firebase";

import CustomerList from "../components/customers/CustomerList";
import BookingList from "../components/bookings/BookingList";
import Copyright from "../components/layout/Copyright"
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import AppbarDrawer from '../components/layout/AppbarDrawer'

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
            <Typography variant="h1">Dashboard</Typography>
            {/* Debug buttons */}
            <Grid item xs={12}>
              {howManyUsersField}
              <Button
                variant="contained"
                color="primary"
                onClick={create_users_button}
              >
                Create one user
              </Button>
            </Grid>
            {/* Customers */}
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <CustomerList />
              </Paper>
            </Grid>
            {/* Bookings */}
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <BookingList />
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
}));

/* const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
} */

/* export default connect(null, mapDispatchToProps)(DashboardPage) */

export default DashboardPage