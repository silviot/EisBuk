import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { deleteSlot, changeCalendarDate } from "../../store/actions/actions";
import { wrapOrganization } from "../../utils/firestore";
import { flatten, getMonthStr } from "../../utils/helpers";
import { makeStyles } from "@material-ui/core/styles";
import SlotsPageContainer from "../../containers/SlotsPageContainer";
import AppbarAdmin from "../../components/layout/AppbarAdmin";

const SlotsPage = () => {
  const classes = useStyles();
  const currentDate = useSelector((state) => state.app.calendarDay);
  const firestore = useFirestore();
  const monthsToQuery = [
    getMonthStr(currentDate, -1),
    getMonthStr(currentDate, 0),
    getMonthStr(currentDate, 1),
  ];
  useFirestoreConnect([
    wrapOrganization({
      collection: "slotsByDay",
      where: [firestore.FieldPath.documentId(), "in", monthsToQuery],
    }),
  ]);
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

  return (
    <div className={classes.root}>
      <AppbarAdmin />
      <main className={classes.content}>
        <SlotsPageContainer
          slots={slots}
          onDelete={onDelete}
          currentDate={currentDate}
          onChangeCalendarDate={onChangeCalendarDate}
        />
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    overflow: "hidden",
  },
}));

export default SlotsPage;
