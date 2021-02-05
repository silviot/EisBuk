import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import {
  Table,
  TableCell,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
} from "@material-ui/core";

/* import ColoredAvatar from "../../components/users/coloredAvatar"; */
import { slotsLabels } from "../../config/appConfig";

import { deleteCustomer, updateCustomer } from "../../store/actions/actions";

export const CustomerList = ({ customers, deleteCustomer, updateCustomer }) => {
  let labels = [];
  Object.keys(slotsLabels).forEach((x) => {
    labels[x] = _.keyBy(slotsLabels[x], "id");
  });
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
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
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.surname}</TableCell>
              <TableCell>{customer.birthdate}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.birthdate}</TableCell>
              <TableCell>{customer.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCustomer: (id) => dispatch(deleteCustomer(id)),
    updateCustomer: (customer) => dispatch(updateCustomer(customer)),
  };
};

export default connect(null, mapDispatchToProps)(CustomerList);
