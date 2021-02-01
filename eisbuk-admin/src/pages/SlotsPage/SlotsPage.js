import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSlot,
  changeCalendarDate,
  createSlots,
} from "../../store/actions/actions";
import { flatten } from "../../utils/helpers";
import { makeStyles } from "@material-ui/core/styles";
import SlotsPageContainer from "../../containers/SlotsPageContainer";
import AppbarAdmin from "../../components/layout/AppbarAdmin";

const SlotsPage = () => {
  const classes = useStyles();
  const currentDate = useSelector((state) => state.app.calendarDay);
  const slots = useSelector((state) =>
    flatten(state.firestore.ordered.slotsByDay)
  );

  const dispatch = useDispatch();

  const onDelete = (id) => {
    dispatch(deleteSlot(id));
  };

  const onChangeCalendarDate = (date) => {
    dispatch(changeCalendarDate(date));
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
          currentDate={currentDate}
          onChangeCalendarDate={onChangeCalendarDate}
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
