import React from 'react'

import {makeStyles} from '@material-ui/styles'
import { DatePicker } from '@material-ui/pickers'
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPickersStaticWrapper-staticWrapperRoot': {
      backgroundColor: 'transparent',
    },
    '& .MuiPickersBasePicker-pickerView': {
      maxWidth: '100%',
      overflowX: 'visible'
    },
    '& .MuiPickersCalendarHeader-transitionContainer': {
      display: 'none'
    },
    '& .MuiPickersCalendarHeader-switchHeader': {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3)
    },
    '& .MuiPickersDay-day, & .MuiPickersCalendarHeader-dayLabel': {
      width: 50,
      height: 50,
      fontSize: '1.2rem',
      color: theme.palette.common.white
    },
    '& .MuiPickersCalendarHeader-dayLabel': {
      opacity: 0.5,
      fontWeight: 900
    },
    '& .MuiPickersCalendar-transitionContainer': {
      minHeight: 320
    },
    '& .MuiPickersDay-current': {
      border: '2px solid'
    },
    '& .MuiPickersDay-daySelected': {
      background: theme.palette.common.white,
      color: theme.palette.primary.main,
      '& .MuiIconButton-label p': {
        fontWeight: 900
      }
    }
  }
}))

const SlotCalendar = ({date, onChange}) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <DatePicker 
        value={date} 
        onChange={onChange}
        animateYearScrolling
        autoOk
        variant="static"
        views={['year', 'month', 'date']}
        disableToolbar
      />
    </Box>
  )
}

export default SlotCalendar
