import React from "react"
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty  } from 'react-redux-firebase'

import CustomerList from "../components/CustomerList";
import Copyright from "../components/Copyright"
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import AppbarDrawer from '../components/AppbarDrawer'
import { Typography } from "@material-ui/core";

import AddClient from '../components/AddClient'

const ClientsPage = () => {
  const classes = useStyles();
  useFirestoreConnect([
    { collection: 'customers' }
  ])
  const customers = useSelector((state) => state.firestore.ordered.customers)

  return (
    <div className={classes.root}>
      <AppbarDrawer />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h1">Clienti</Typography>
            </Grid>
            <Grid item xs={12}>
              <AddClient />
            </Grid>
            <Grid item xs={12}>
              { isLoaded(customers), !isEmpty(customers) &&
              <CustomerList customers={customers.map(o => ({...o, tableData: {}})) } />
              }
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
}));

export default ClientsPage