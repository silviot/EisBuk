import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Fab,
  Tooltip,
} from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  content: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
    "&:last-child": {
      //Fix for Material-UI defaulting this to 24
      paddingBottom: 0,
    },
  },
  date: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    padding: theme.spacing(1.5),
    "& .MuiTypography-root:not(.makeStyles-weekday-20)": {
      lineHeight: 1,
    },
  },
  body: {
    padding: theme.spacing(1.5),
  },
  category: {},
  type: {
    textTransform: "uppercase",
  },
  duration: {
    marginLeft: theme.spacing(1.5),
  },
  weekday: {
    textTransform: "uppercase",
    fontSize: theme.typography.h4.fontSize,
  },
  day: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.fontWeightLight,
  },
  month: {},
  deleteButton: {},
}));

const MyCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Box className={classes.date} textAlign="center">
          <Typography variant="h5" className={classes.weekday}>
            Lunedì
          </Typography>
          <Typography className={classes.day}>15</Typography>
          <Typography className={classes.month}>Febbraio</Typography>
        </Box>
        <Box className={classes.body} flexGrow={1} flexDirection="column">
          <Box>
            <Typography display="inline" variant="h5" component="h2">
              {/*           {date.toISOTime().substring(0, 5)} */}16:30 - 17:50
            </Typography>
            <Chip
              className={classes.duration}
              variant="outlined"
              label="90min"
            />
          </Box>
          <Chip
            className={classes.type}
            key="type"
            size="small"
            icon={<StarsIcon />}
            label="Off ice danza"
          />
        </Box>
        <Box display="flex" alignItems="center" pr={1.5}>
          <Tooltip title="Cancella Prenotazione" placement="left">
            <Fab
              color="primary"
              aria-label="add"
              className={classes.deleteButton}
            >
              <HighlightOffIcon />
            </Fab>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

const CustomerAreaBookingCard = ({ date, category }) => {
  return (
    <>
      <MyCard />
      <MyCard />
      <MyCard />
      <MyCard />
      <MyCard />
      <MyCard />
    </>
  );
};

export default CustomerAreaBookingCard;
