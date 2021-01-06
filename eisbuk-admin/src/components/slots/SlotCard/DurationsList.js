import React from "react";

import { makeStyles } from "@material-ui/styles";
import { Box, Chip } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& >*": {
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    },
  },
  duration: {
    fontWeight: 700,
    color: theme.palette.grey[200],
    fontSize: theme.typography.h6,
  },
}));

const DurationsList = ({ durations, labels }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} flexWrap="wrap">
      {durations.map((duration) => (
        <Chip
          icon={<ChevronRight />}
          size="small"
          variant="outlined"
          label={labels.durations[duration].label}
        />
      ))}
    </Box>
  );
};

export default DurationsList;
