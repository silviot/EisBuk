import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import _ from "lodash";

import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
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
} from "@material-ui/core";

import ColoredAvatar from "../../components/users/coloredAvatar";

import { deleteCustomer, updateCustomer } from "../../store/actions/actions";

export const CustomerList = ({
  customers,
  onDeleteCustomer,
  onEditCustomer,
}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [searchString, setSearchString] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
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
    <div className={classes.root}>
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
                  onClick={() => onDeleteCustomer(customer.id)}
                >
                  <DeleteIcon />
                </IconButton>
              ) : null;
              const editButton = onEditCustomer ? (
                <IconButton
                  className="deleteButton"
                  aria-label="delete"
                  color="primary"
                  onClick={() => onDeleteCustomer(customer.id)}
                >
                  <EditIcon />
                </IconButton>
              ) : null;
              return (
                <TableRow key={customer.id}>
                  <TableCell>
                    <Box className={classes.actionsBox}>
                      {deleteButton}
                      {editButton}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <ColoredAvatar {...customer} className={classes.avatar} />
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
    </div>
  );
};

const SearchField = ({ setSearchString }) => {
  const handleChange = (e) => {
    setSearchString(e.target.value);
  };
  return (
    <div>
      Search: <input autoComplete="off" name="search" onChange={handleChange} />
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  actionsBox: {
    width: "max-content",
    whiteSpace: "no-wrap",
  },
  avatar: {
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
