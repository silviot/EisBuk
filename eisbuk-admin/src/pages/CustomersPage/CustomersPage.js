import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

import AppbarAdmin from "../../components/layout/AppbarAdmin";
import CustomerList from "../../components/customers/CustomerList";
import { makeStyles } from "@material-ui/core/styles";

import { Container, Fab, Grid, LinearProgress } from "@material-ui/core";

import { Add as AddIcon } from "@material-ui/icons";

import CustomerForm from "../../components/customers/CustomerForm";
import { deleteCustomer, updateCustomer } from "../../store/actions/actions";
import { useTitle } from "../../utils/helpers";

const selectCustomers = (state) => state.firestore.ordered.customers;

const CustomersPage = () => {
  const classes = useStyles();
  const [addAthleteDialog, setAddAthleteDialog] = useState(false);
  const dispatch = useDispatch();
  useTitle("Atleti");

  const toggleAddAthleteDialog = () =>
    setAddAthleteDialog(addAthleteDialog ? false : true);
  const customers = useSelector(selectCustomers);

  return (
    <>
      <AppbarAdmin />
      {!isLoaded(customers) && <LinearProgress />}
      <Container maxWidth="lg" className={classes.customersContainer}>
        <Grid item xs={12}>
          {
            (isLoaded(customers),
            !isEmpty(customers) && (
              <CustomerList
                onDeleteCustomer={(customer) =>
                  dispatch(deleteCustomer(customer))
                }
                updateCustomer={(customer) =>
                  dispatch(updateCustomer(customer))
                }
                customers={customers.map((o) => ({
                  ...o,
                  tableData: {},
                }))}
              />
            ))
          }
          <Fab
            color="primary"
            aria-label="Aggiungi atleta"
            className={classes.fab}
            onClick={toggleAddAthleteDialog}
          >
            <AddIcon />
          </Fab>
          <CustomerForm
            open={addAthleteDialog}
            handleClose={toggleAddAthleteDialog}
            updateCustomer={(customer) => dispatch(updateCustomer(customer))}
          />
        </Grid>
      </Container>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  headerHero: {
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  customersContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
}));

export default CustomersPage;
