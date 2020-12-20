import React from 'react'

import {makeStyles} from '@material-ui/styles'
import { Avatar, Tooltip } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main.contrastText,
    backgroundColor: theme.palette.primary.main,
  }
}))

const UserAvatar = () => {
  const classes = useStyles()
  return (
    <Tooltip title="Osman Pizza" placement="right">
      <Avatar className={classes.root}>OP</Avatar>
    </Tooltip>
  )
}

export default UserAvatar
