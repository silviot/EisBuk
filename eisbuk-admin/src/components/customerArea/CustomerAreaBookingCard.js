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
import { FBToLuxon } from "../../data/dtutils";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
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
  month: {
    textTransform: "capitalize",
  },
  deleteButton: {},
}));

const CustomerAreaBookingCard = ({ data, onUnsubscribe }) => {
  const classes = useStyles();

  const date = FBToLuxon(data.date);
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Box className={classes.date} textAlign="center">
          <Typography variant="h5" className={classes.weekday}>
            {date.toFormat("EEE", { locale: "it-IT" })}
          </Typography>
          <Typography className={classes.day}>
            {date.toFormat("d", { locale: "it-IT" })}
          </Typography>
          <Typography className={classes.month}>
            {date.toFormat("MMMM", { locale: "it-IT" })}
          </Typography>
        </Box>
        <Box className={classes.body} flexGrow={1} flexDirection="column">
          <Box>
            <Typography display="inline" variant="h5" component="h2">
              {date.toISOTime().substring(0, 5)}
            </Typography>
            <Typography display="inline" variant="h6" component="h3">
              {" "}
              -{" "}
              {date
                .plus({ minutes: data.duration })
                .minus({ minutes: 10 })
                .toISOTime()
                .substring(0, 5)}
            </Typography>
            <Chip
              className={classes.duration}
              variant="outlined"
              label={data.duration + "min"}
            />
          </Box>
          <Chip
            className={classes.type}
            key="type"
            size="small"
            icon={<StarsIcon />}
            label={data.type}
          />
        </Box>
        <Box display="flex" alignItems="center" pr={1.5}>
          <Tooltip title="Cancella Prenotazione" placement="left">
            <Fab
              color="primary"
              aria-label="add"
              className={classes.deleteButton}
              onClick={() => onUnsubscribe(data)}
            >
              <HighlightOffIcon />
            </Fab>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomerAreaBookingCard;
