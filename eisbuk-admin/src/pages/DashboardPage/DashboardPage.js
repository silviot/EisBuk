import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";

import AppbarAdmin from "../../components/layout/AppbarAdmin";

const DashboardPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <AppbarAdmin />
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Box py={3}>
            <Grid container spacing={3}>
              <Grid
                className={classes.dashboardActionBlock}
                item
                xs={12}
                md={6}
              >
                <Link to="/prenotazioni">
                  <Card>
                    <CardContent>
                      <Typography variant="h3">Prenotazioni</Typography>
                      <Typography variant="body1">
                        Gestisci le prenotazioni delle tue lezioni
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
              {/* Bookings */}
              <Grid
                className={classes.dashboardActionBlock}
                item
                xs={12}
                md={6}
              >
                <Link to="/atleti">
                  <Card>
                    <CardContent>
                      <Typography variant="h3">Atleti</Typography>
                      <Typography variant="body1">
                        Gestisci e monitora i tuoi atleti
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.secondary.main,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  pageTitle: {
    color: theme.palette.primary.contrastText,
  },
  dashboardActionBlock: {
    "& a, a:hover, a:focus": {
      textDecoration: "none",
    },
  },
}));

/* const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
} */

/* export default connect(null, mapDispatchToProps)(DashboardPage) */

export default DashboardPage;
