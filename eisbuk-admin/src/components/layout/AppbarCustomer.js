import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

const AppbarCustomer = () => {
  const classes = useStyles();

  return (
    <AppBar
    position="absolute"
    className={classes.appBar}
    >
        <Toolbar className={classes.toolbar}>
            <Typography
            component="h1"
            variant="h6"
            color="inherit"
            align="center"
            noWrap
            className={classes.title}
            >
            IGOR ICE
            </Typography>
        </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  }
}));
  
export default AppbarCustomer