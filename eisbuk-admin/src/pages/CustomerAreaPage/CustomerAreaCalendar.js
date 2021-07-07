import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useFirestoreConnect,
  useFirestore,
  isLoaded,
} from "react-redux-firebase";
import { flatten, getMonthStr } from "../../utils/helpers";

import SlotsPageContainer from "../../containers/SlotsPageContainer";
import { wrapOrganization } from "../../utils/firestore";
import {
  subscribeToSlot,
  unsubscribeFromSlot,
} from "../../store/actions/actions";
import LuxonUtils from "@date-io/luxon";
import _ from "lodash";

const luxon = new LuxonUtils({ locale: "it" });

const slotsSelector = (state) => flatten(state.firestore.ordered.slotsByDay);
const subscribedSlotsSelector = (state) => state.firestore.data.subscribedSlots;

const CustomerAreaCalendar = ({ category, view = "slots" }) => {
  const start = luxon.date().startOf("week");
  const { secret_key } = useParams();
  const [currentDate, onChangeCalendarDate] = useState(start);
  const firestore = useFirestore();
  const monthsToQuery = [
    getMonthStr(currentDate, -1),
    getMonthStr(currentDate, 0),
    getMonthStr(currentDate, 1),
  ];

  const where = [
    ["date", ">=", currentDate.minus({ days: 14 }).toJSDate()],
    ["date", "<", currentDate.plus({ days: 14 }).toJSDate()],
  ];
  useFirestoreConnect([
    wrapOrganization({
      collection: "slotsByDay",
      where: [firestore.FieldPath.documentId(), "in", monthsToQuery],
    }),
    wrapOrganization({
      collection: "bookings",
      doc: secret_key,
      storeAs: "subscribedSlots",
      subcollections: [
        {
          collection: "data",
          where,
        },
      ],
    }),
  ]);
  const allSlotsByDay = _.omitBy(
    useSelector(slotsSelector),
    (el) => typeof el === "string"
  );
  const slots = _.mapValues(allSlotsByDay, (daySlots) =>
    _.pickBy(daySlots, (slot) => {
      return slot.categories.includes(category);
    })
  );
  var subscribedSlots = useSelector(subscribedSlotsSelector);

  const dispatch = useDispatch();
  var onSubscribe = (slot) => {
    dispatch(subscribeToSlot(secret_key, slot));
  };
  const onUnsubscribe = (slot) => {
    dispatch(unsubscribeFromSlot(secret_key, slot));
  };
  if (!isLoaded(subscribedSlots)) {
    onSubscribe = undefined;
  }
  return (
    <>
      <SlotsPageContainer
        {...{
          slots,
          currentDate,
          onChangeCalendarDate,
          onSubscribe,
          onUnsubscribe,
          subscribedSlots,
          view,
          isCustomer: true,
        }}
      />
    </>
  );
};

export default CustomerAreaCalendar;
