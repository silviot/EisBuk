import React, { useState } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { signIn, signInWithGoogle } from "../../store/actions/actions";
import figureSkatingSilhouetteCouple from "../../assets/images/login/figure-skating-silhouette-couple.svg";
import figureSkatingSilhouetteSkirt from "../../assets/images/login/figure-skating-silhouette-skirt.svg";
import figureSkatingSilhouette from "../../assets/images/login/figure-skating-silhouette.svg";
import girlIceSkating from "../../assets/images/login/girl-ice-skating-silhouette.svg";
import iceSkatingSilhouette from "../../assets/images/login/ice-skating-silhouette.svg";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";

import Copyright from "../../components/layout/Copyright";
import { getCurrentOrganizationSettings } from "../../themes";

const loginBackgrounds = [
  figureSkatingSilhouetteCouple,
  figureSkatingSilhouetteSkirt,
  figureSkatingSilhouette,
  girlIceSkating,
  iceSkatingSilhouette,
];

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInSide = ({ signIn }) => {
  const classes = useStyles();
  const [credentials, setCredentials] = useState({
    email: "test@eisbuk.it",
    password: "test00",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(credentials);
  };

  const loginWithGoogle = (e) => {
    e.preventDefault();
    signInWithGoogle();
  };

  const currentOrganizationSettings = getCurrentOrganizationSettings();

  const loginImageStyle = {
    backgroundImage: `url(${_.sample(loginBackgrounds)})`,
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        className={classes.image}
        style={loginImageStyle}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {currentOrganizationSettings.name}
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={credentials.email}
              onChange={handleInputChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={credentials.password}
              onChange={handleInputChange}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Resta connesso"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Button onClick={loginWithGoogle}>Login With Google</Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Password dimenticata?
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(null, mapDispatchToProps)(SignInSide);
