import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import CustomerForm from "../../components/customers/CustomerForm";

import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  DateRange as DateRangeIcon,
} from "@material-ui/icons";
import {
  Box,
  IconButton,
  Table,
  TableCell,
  TableContainer,
  TableBody,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@material-ui/core";

import ColoredAvatar from "../../components/users/coloredAvatar";

export const CustomerList = ({
  customers,
  onDeleteCustomer,
  updateCustomer,
}) => {
  const [page, setPage] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [customerCurrentlyEdited, setCustomerCurrentlyEdited] = useState(null);
  const history = useHistory();
  const goTo = useCallback((url) => history.push(url), [history]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, customers.length - page * rowsPerPage);
  const searchRe = new RegExp(searchString, "i");
  const customersToShow = _.slice(
    customers,
    rowsPerPage * page,
    rowsPerPage * (page + 1)
  ).filter((el) => searchRe.test(el.name) || searchRe.test(el.surname));
  const rowsPerPageOptions = [10, 15, 50, 100];

  return (
    <>
      <SearchField setSearchString={setSearchString}></SearchField>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
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
            {customersToShow.map((customer) => {
              const deleteButton = onDeleteCustomer ? (
                <IconButton
                  className="deleteButton"
                  aria-label="delete"
                  color="primary"
                  onClick={() => onDeleteCustomer(customer)}
                >
                  <DeleteIcon />
                </IconButton>
              ) : null;
              const editButton = updateCustomer ? (
                <IconButton
                  className="deleteButton"
                  aria-label="delete"
                  color="primary"
                  onClick={() => setCustomerCurrentlyEdited(customer)}
                >
                  <EditIcon />
                </IconButton>
              ) : null;
              const bookingsButton = (
                <IconButton
                  color="primary"
                  onClick={() => {
                    goTo(`/clienti/${customer.secret_key}`);
                  }}
                >
                  <DateRangeIcon />
                </IconButton>
              );
              return (
                <TableRow key={customer.id}>
                  <TableCell>
                    <Box>
                      {deleteButton}
                      {editButton}
                      {bookingsButton}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <ColoredAvatar {...customer} />
                  </TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.surname}</TableCell>
                  <TableCell>{customer.birthdate}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.birthdate}</TableCell>
                  <TableCell>{customer.category}</TableCell>
                </TableRow>
              );
            })}
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
        rowsPerPageOptions={rowsPerPageOptions}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <CustomerForm
        open={Boolean(customerCurrentlyEdited)}
        handleClose={() => setCustomerCurrentlyEdited(null)}
        customer={customerCurrentlyEdited}
        updateCustomer={updateCustomer}
      />
    </>
  );
};

const SearchField = ({ setSearchString }) => {
  const handleChange = (e) => {
    setSearchString(e.target.value);
  };
  return <TextField label="Search" type="search" onChange={handleChange} />;
};

export default CustomerList;
