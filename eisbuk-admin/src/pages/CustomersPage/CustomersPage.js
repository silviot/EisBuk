import React from "react"
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty  } from 'react-redux-firebase'

import CustomerList from "../../components/customers/CustomerList";
import Copyright from "../../components/layout/Copyright"
import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LinearProgress from '@material-ui/core/LinearProgress'

import AppbarDrawer from '../../components/layout/AppbarDrawer'
import { Typography } from "@material-ui/core";

import AddCustomer from '../../components/customers/AddCustomer'

const CustomersPage = () => {
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
          <Grid container className={classes.headerHero}>
            <Container maxWidth="lg">
              <Grid item xs={12}>
                <Typography className={classes.pageTitle} variant="h1">Clienti</Typography>
              </Grid>
              <Grid item xs={12}>
                <AddCustomer />
              </Grid>
            </Container>
          </Grid>
          { !isLoaded(customers) && <LinearProgress /> }
          <Container maxWidth="lg" className={classes.customersContainer}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                { isLoaded(customers), !isEmpty(customers) &&
                <Paper>
                  <Box p={3}>
                    <CustomerList customers={customers.map(o => ({...o, tableData: {}})) } />
                  </Box>
                </Paper>
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
  headerHero: {
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(3)
  },
  pageTitle: {
    color: theme.palette.primary.contrastText
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
  customersContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

export default CustomersPage