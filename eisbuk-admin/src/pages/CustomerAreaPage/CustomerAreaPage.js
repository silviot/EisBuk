import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import PersonPinIcon from "@material-ui/icons/PersonPin";

import AppbarCustomer from "../../components/layout/AppbarCustomer";

import CustomerAreaCalendar from "./CustomerAreaCalendar";

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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export const CustomerAreaPage = () => {
  const classes = useStyles();
  let { id } = useParams();
  useFirestoreConnect([
    {
      collection: "customers",
      doc: id,
    },
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const customerData = useSelector(
    (state) => state.firestore.ordered.customers
  );
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <div className={classes.root}>
      <AppbarCustomer />
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
                    icon={<PersonPinIcon />}
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
              <Grid container className={classes.headingHero}>
                <Container maxWidth="lg">
                  <Grid item xs={12}>
                    <Box py={3}>
                      <Typography variant="h6">
                        Benvenuto {customerData[0].name}{" "}
                        {customerData[0].surname}
                      </Typography>
                      <Typography variant="p">
                        {customerData[0].category}
                      </Typography>
                    </Box>
                  </Grid>
                </Container>
              </Grid>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
              <Grid container className={classes.headingHero}>
                <Container maxWidth="lg">
                  <Grid item xs={12}>
                    <Box py={3}>
                      <CustomerAreaCalendar
                        userCategory={customerData[0].category}
                      />
                    </Box>
                  </Grid>
                </Container>
              </Grid>
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
              <Grid container className={classes.headingHero}>
                <Container maxWidth="lg">
                  <Grid item xs={12}>
                    <Box py={3}>
                      <Typography variant="h6">
                        Prenotazioni {customerData[0].name}
                      </Typography>
                    </Box>
                  </Grid>
                </Container>
              </Grid>
            </TabPanel>
          </>
        )}
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  headingHero: {
    /*         backgroundColor: theme.palette.secondary.main,
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        flexGrow: 1 */
  },
  customerNav: {
    backgroundColor: theme.palette.grey[900],
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

export default CustomerAreaPage;
