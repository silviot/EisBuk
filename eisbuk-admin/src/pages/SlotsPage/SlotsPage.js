import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSlot, createSlots } from "../../store/actions/actions";
import { flatten } from "../../utils/helpers";
import { makeStyles } from "@material-ui/core/styles";
import SlotsPageContainer from "../../containers/SlotsPageContainer";
import AppbarAdmin from "../../components/layout/AppbarAdmin";

const selectSlots = (state) => flatten(state.firestore.ordered.slotsByDay);

const SlotsPage = () => {
  const classes = useStyles();
  const slots = useSelector(selectSlots);

  const dispatch = useDispatch();

  const onDelete = (id) => {
    dispatch(deleteSlot(id));
  };

  const onCreateSlot = (slot) => {
    dispatch(createSlots([slot]));
  };
  return (
    <div className={classes.root}>
      <AppbarAdmin />
      <main className={classes.content}>
        <SlotsPageContainer
          slots={slots}
          onDelete={onDelete}
          onCreateSlot={onCreateSlot}
        />
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default SlotsPage;
