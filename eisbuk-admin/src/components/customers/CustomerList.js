import React, { useState } from "react";
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
import ConfirmDialog from "../global/ConfirmDialog";

export const CustomerList = ({
  customers,
  onDeleteCustomer,
  updateCustomer,
}) => {
  const [page, setPage] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [customerCurrentlyEdited, setCustomerCurrentlyEdited] = useState(null);
  const [customerCurrentlyDeleted, setCustomerCurrentlyDeleted] = useState(
    null
  );
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
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
  const history = useHistory();

  return (
    <>
      <SearchField setSearchString={setSearchString}></SearchField>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Cognome</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customersToShow.map((customer) => {
              const deleteButton = onDeleteCustomer ? (
                <IconButton
                  aria-label="delete"
                  color="primary"
                  onClick={() => {
                    setConfirmDeleteDialog(true);
                    setCustomerCurrentlyDeleted(customer);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              ) : null;
              const editButton = updateCustomer ? (
                <IconButton
                  aria-label="update"
                  color="primary"
                  onClick={() => setCustomerCurrentlyEdited(customer)}
                >
                  <EditIcon />
                </IconButton>
              ) : null;
              const bookingsButton = customer.secret_key && (
                <IconButton
                  color="primary"
                  href={`/clienti/${customer.secret_key}`}
                  onClick={(e) =>
                    e.preventDefault() ||
                    history.push(`/clienti/${customer.secret_key}`)
                  }
                >
                  <DateRangeIcon />
                </IconButton>
              );
              return (
                <TableRow key={customer.id}>
                  <TableCell>
                    <Box display="flex" flexDirection="row">
                      {deleteButton}
                      {editButton}
                      {bookingsButton}
                      <ColoredAvatar {...customer} />
                    </Box>
                  </TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.surname}</TableCell>
                  <TableCell>{customer.category}</TableCell>
                  <TableCell>{customer.email}</TableCell>
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
      {customerCurrentlyDeleted && (
        <ConfirmDialog
          title={
            "Sei sicuro di voler rimuovere " +
            customerCurrentlyDeleted.name +
            " " +
            customerCurrentlyDeleted.surname
          }
          open={confirmDeleteDialog}
          setOpen={setConfirmDeleteDialog}
          onConfirm={() => onDeleteCustomer(customerCurrentlyDeleted)}
        >
          Questa azione non è reversibile, l'utente verrà cancellato
          definitivamente.
        </ConfirmDialog>
      )}
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
