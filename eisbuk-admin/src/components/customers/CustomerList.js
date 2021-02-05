import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import _ from "lodash";

import {
  Table,
  TableCell,
  TableContainer,
  TableBody,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";

import ColoredAvatar from "../../components/users/coloredAvatar";

import { deleteCustomer, updateCustomer } from "../../store/actions/actions";

export const CustomerList = ({ customers, deleteCustomer, updateCustomer }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, customers.length - page * rowsPerPage);
  const customersToShow = _.slice(
    customers,
    rowsPerPage * page,
    rowsPerPage * (page + 1)
  );
  return (
    <div className={classes.root}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Cognome</TableCell>
              <TableCell>Età</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Data di nascita</TableCell>
              <TableCell>Categoria</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customersToShow.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <ColoredAvatar {...customer} className={classes.small} />
                </TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.surname}</TableCell>
                <TableCell>{customer.birthdate}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.birthdate}</TableCell>
                <TableCell>{customer.category}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell colSpan={8} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={customers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPageOptions={[10, 20, 50, 100, 500]}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCustomer: (id) => dispatch(deleteCustomer(id)),
    updateCustomer: (customer) => dispatch(updateCustomer(customer)),
  };
};

export default connect(null, mapDispatchToProps)(CustomerList);
