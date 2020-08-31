import React from 'react'
import AppbarDrawer from './AppbarDrawer'
import { makeStyles } from "@material-ui/core/styles";
import DashboardPage from '../pages/Dashboard';

const Layout = ({children}) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AppbarDrawer />
            <DashboardPage />
            {{children}}
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
      },
}));

export default Layout