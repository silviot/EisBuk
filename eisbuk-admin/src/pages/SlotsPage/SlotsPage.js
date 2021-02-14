import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSlot, createSlots } from "../../store/actions/actions";
import { flatten } from "../../utils/helpers";
import SlotsPageContainer from "../../containers/SlotsPageContainer";
import AppbarAdmin from "../../components/layout/AppbarAdmin";
import { useTitle } from "../../utils/helpers";

const selectSlots = (state) => flatten(state.firestore.ordered.slotsByDay);

const SlotsPage = () => {
  const slots = useSelector(selectSlots);
  useTitle("Slots");

  const dispatch = useDispatch();

  const onDelete = (id) => {
    dispatch(deleteSlot(id));
  };

  const onCreateSlot = (slot) => {
    dispatch(createSlots([slot]));
  };
  return (
    <div>
      <AppbarAdmin />
      <SlotsPageContainer
        slots={slots}
        onDelete={onDelete}
        onCreateSlot={onCreateSlot}
      />
    </div>
  );
};

export default SlotsPage;
