import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  time: {
    width: 151,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.6rem',
    fontWeight: '500'
  },
}));

export const BookingCard = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
        <div className={classes.time}>
            14.30
        </div>
        <div className={classes.details}>
            <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                    {props.id}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {props.customer_id}
                </Typography>
            </CardContent>
        </div>
    </Card>
  );
}

export default BookingCard