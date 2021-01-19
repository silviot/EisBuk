import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import MaterialTable, { MTablePagination } from "material-table";
import tableIcons from "../../utils/tableIcons";
import Grid from "@material-ui/core/Grid";

import ColoredAvatar from "../../components/users/coloredAvatar";
import { slotsLabels } from "../../config/appConfig";
import moment from "moment";

import { deleteCustomer, updateCustomer } from "../../store/actions/actions";

export const CustomerList = ({ customers, deleteCustomer, updateCustomer }) => {
  let history = useHistory();
  let labels = [];
  Object.keys(slotsLabels).forEach((x) => {
    labels[x] = _.keyBy(slotsLabels[x], "id");
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <MaterialTable
          columns={[
            {
              title: "",
              export: false,
              field: "name",
              render: (rowData) =>
                rowData.name && rowData.surname ? (
                  <ColoredAvatar
                    name={rowData.name}
                    surname={rowData.surname}
                  />
                ) : null,
            },
            { title: "Nome", field: "name" },
            { title: "Cognome", field: "surname" },
            { title: "Email", field: "email" },
            { title: "Telefono", field: "phone" },
            {
              title: "Età",
              field: "birth",
              render: (rowData) =>
                rowData.birth
                  ? moment().diff(moment.unix(rowData.birth.seconds), "years")
                  : null,
            },
            {
              title: "Categoria",
              field: "category",
              render: (rowData) =>
                rowData.category
                  ? labels.categories[rowData.category] &&
                    labels.categories[rowData.category].label
                  : null,
            },
          ]}
          data={customers}
          icons={tableIcons}
          title=""
          options={{
            exportButton: true,
            pageSize: 10,
            actionsColumnIndex: -1,
            searchFieldAlignment: "left",
            paginationType: "stepped",
          }}
          actions={[
            {
              icon: tableIcons.NextPage,
              tooltip: "Visualizza Profilo",
              onClick: (event, rowData) => {
                history.push(`/clienti/${rowData.secret_key}`);
              },
            },
          ]}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                console.log(newData);
                updateCustomer(newData);
                resolve();
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                deleteCustomer(oldData.id);
                resolve();
              }),
          }}
          localization={{
            body: {
              editTooltip: "Modifica",
              deleteTooltip: "Elimina",
              editRow: {
                deleteText: "Sei sicuro che vuoi eliminare questo utente?",
                saveTooltip: "Salva",
                cancelTooltip: "Annulla",
              },
            },
            header: {
              actions: "",
            },
            pagination: {
              labelRowsSelect: "Utenti",
              labelDisplayedRows: "{from}-{to} di {count}",
            },
            toolbar: {
              exportTitle: "Esporta",
              searchPlaceholder: "Cerca",
              searchTooltip: "Cerca",
            },
          }}
          components={{
            Container: (props) => <div>{props.children}</div>,
            Pagination: (props) => (
              <MTablePagination {...props} style={{ background: "red" }} />
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCustomer: (id) => dispatch(deleteCustomer(id)),
    updateCustomer: (customer) => dispatch(updateCustomer(customer)),
  };
};

export default connect(null, mapDispatchToProps)(CustomerList);
