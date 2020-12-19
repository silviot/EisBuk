import React from "react";

import { makeStyles } from "@material-ui/styles";

import { SlotCard } from "../SlotCard/SlotCard";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const SlotList = ({ slots, deleteSlot }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {slots &&
        slots.map((slot) => (
          <SlotCard key={slot.id} deleteSlot={deleteSlot} {...slot} />
        ))}
    </Box>
  );
};

export default SlotList;
