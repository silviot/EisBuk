import React, { forwardRef } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import MaterialTable, { MTablePagination } from "material-table";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Grid from "@material-ui/core/Grid";

import ColoredAvatar from "../../components/users/coloredAvatar";
import { slotsLabels } from "../../config/appConfig";
import moment from "moment";

import { deleteCustomer, updateCustomer } from "../../store/actions/actions";

export const CustomerList = ({ customers, deleteCustomer, updateCustomer }) => {
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
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
              render: (rowData) => (
                <ColoredAvatar name={rowData.name} surname={rowData.surname} />
              ),
            },
            { title: "Nome", field: "name" },
            { title: "Cognome", field: "surname" },
            { title: "Email", field: "email" },
            { title: "Telefono", field: "phone" },
            {
              title: "Età",
              field: "birth",
              render: (rowData) => (
                <>
                  {moment().diff(moment.unix(rowData.birth.seconds), "years")}
                </>
              ),
            },
            {
              title: "Categoria",
              field: "category",
              render: (rowData) => labels.categories[rowData.category].label,
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
                history.push(`/clienti/${rowData.id}`);
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
