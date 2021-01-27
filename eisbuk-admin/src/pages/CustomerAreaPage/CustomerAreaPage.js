import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

import { makeStyles } from "@material-ui/core/styles";

import { Container, Typography, AppBar, Tabs, Tab } from "@material-ui/core";

import {
  PersonPin as PersonPinIcon,
  EventNote as EventNoteIcon,
} from "@material-ui/icons";

import AppbarCustomer from "../../components/layout/AppbarCustomer";
import AppbarAdmin from "../../components/layout/AppbarAdmin";

import CustomerAreaCalendar from "./CustomerAreaCalendar";
import { wrapOrganization } from "../../utils/firestore";

const LinkTab = (props) => {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`customer-tabpanel-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

export const CustomerAreaPage = () => {
  const classes = useStyles();
  let { secret_key } = useParams();
  useFirestoreConnect([
    wrapOrganization({
      collection: "bookings",
      doc: secret_key,
    }),
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const customerData = useSelector((state) => state.firestore.ordered.bookings);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const title =
    customerData &&
    customerData[0] &&
    `${customerData[0].name} ${customerData[0].surname}`;
  const auth = useSelector((state) => state.firebase.auth);

  const adminAppBar = isLoaded(auth) && !isEmpty(auth) ? <AppbarAdmin /> : null;
  return (
    <Container maxWidth="sm">
      {adminAppBar}
      <AppbarCustomer headingText={title} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {isLoaded(customerData) && !isEmpty(customerData) && (
          <>
            <AppBar position="static" className={classes.customerNav}>
              <Container maxWidth="xl">
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  centered
                >
                  <LinkTab
                    label="Bacheca"
                    icon={<PersonPinIcon />}
                    href="/drafts"
                  />
                  <LinkTab
                    label="Calendario"
                    icon={<EventNoteIcon />}
                    href="/drafts"
                  />
                  <LinkTab
                    label="Prenotazioni"
                    icon={<PersonPinIcon />}
                    href="/trash"
                  />
                </Tabs>
              </Container>
            </AppBar>
            <TabPanel value={activeTab} index={0}>
              <Typography variant="h6">
                Benvenuto {customerData[0].name} {customerData[0].surname}
              </Typography>
              <Typography variant="p">{customerData[0].category}</Typography>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
              <CustomerAreaCalendar className="foobar" />
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
              <Typography variant="h6">
                Prenotazioni {customerData[0].name}
              </Typography>
            </TabPanel>
          </>
        )}
      </main>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  customerNav: {
    backgroundColor: theme.palette.grey[900],
  },
}));

export default CustomerAreaPage;
