import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import moment from 'moment'
import Moment from 'react-moment'
import {connect} from 'react-redux'

import {deleteBookingSlot} from '../../store/actions/actions'

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
  const formattedDate = moment.unix(props.date.seconds).format('D MMMM YYYY HH:mm:ss')
  const formattedHour = moment.unix(props.date.seconds).locale('it').format('HH:mm')
  console.log()
  const handleDelete = (e) => {
    e.preventDefault()
    props.deleteBookingSlot(props.id.toString())
  }
  return (
    <Card className={classes.root}>
        <div className={classes.time}>
        { formattedHour }

        </div>
        <div className={classes.details}>
            <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                    { formattedDate }
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    <strong>Durata</strong> : {props.duration} minuti
                </Typography>
                <IconButton aria-label="delete" color="primary" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
            </CardContent>
        </div>
    </Card>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBookingSlot: (id) => dispatch(deleteBookingSlot(id))
  }
}

export default connect(null, mapDispatchToProps)(BookingCard)