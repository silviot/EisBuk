import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { deleteSlot, changeCalendarDate } from "../../store/actions/actions";
import { wrapOrganization } from "../../utils/firestore";
import { makeStyles } from "@material-ui/core/styles";
import SlotsPageContainer from "../../containers/SlotsPageContainer";
import AppbarAdmin from "../../components/layout/AppbarAdmin";

const SlotsPage = () => {
  const classes = useStyles();
  const currentDate = useSelector((state) => state.app.calendarDay);
  const prevMonthStr = currentDate
    .minus({ months: 1 })
    .toISODate()
    .substring(0, 7);
  const currMonthStr = currentDate.toISODate().substring(0, 7);
  const nextMonthStr = currentDate
    .plus({ months: 1 })
    .toISODate()
    .substring(0, 7);
  const firestore = useFirestore();
  const monthsToQuery = [prevMonthStr, currMonthStr, nextMonthStr];
  useFirestoreConnect([
    wrapOrganization({
      collection: "slotsByDay",
      where: [firestore.FieldPath.documentId(), "in", monthsToQuery],
    }),
  ]);
  const slots = useSelector((state) => {
    const slots = {};
    if (typeof state.firestore.ordered.slotsByDay !== "undefined") {
      for (const availableSlots of state.firestore.ordered.slotsByDay) {
        for (const key in availableSlots) {
          if (Object.hasOwnProperty.call(availableSlots, key)) {
            if (key === "id") continue;
            slots[key] = availableSlots[key];
          }
        }
      }
    }
    return slots;
  });

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

const useStyles = makeStyles((theme) => ({}));

export default SlotsPage;
