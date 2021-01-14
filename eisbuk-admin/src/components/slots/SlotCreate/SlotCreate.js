import React from "react";

import { makeStyles, Grid, Box, Dialog, DialogTitle } from "@material-ui/core";

import SlotCreateForm from "./SlotCreateForm";

const SlotCreate = ({ createSlot, open, onClose, onOpen }) => {
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={onClose}>
      <Box width={310}>
        <DialogTitle className={classes.drawerTitle}>Aggiungi Slot</DialogTitle>
        <Grid container>
          <Grid item xs={12}>
            <SlotCreateForm action={createSlot} />
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({}));

export default SlotCreate;
