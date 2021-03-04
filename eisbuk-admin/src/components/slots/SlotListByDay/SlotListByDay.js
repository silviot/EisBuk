import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import SlotsDay from "./SlotsDay";
import SlotCreate from "../SlotCreate";

const SlotListByDay = ({
  slots,
  onDelete,
  onSubscribe,
  onUnsubscribe,
  subscribedSlots,
  onCreateSlot,
  onEditSlot,
  className,
  enableEdit,
  view,
  isCustomer,
}) => {
  const [createEditDialog, setCreateEditDialog] = useState({
    isOpen: false,
    day: null,
    slotToEdit: null,
  });

  const classes = useStyles();
  if (typeof slots === "undefined") {
    return <div>Loading...</div>;
  }
  const days = Object.keys(slots)
    .filter((el) => el !== "id")
    .sort();
  const onCloseCreateEditDialog = () => {
    setCreateEditDialog({
      isOpen: false,
      day: null,
      slotToEdit: null,
    });
  };

  return (
    <>
      <List dense={true} className={className + " " + classes.root}>
        {days.map((el) => (
          <SlotsDay
            key={el}
            day={el}
            slots={slots[el]}
            {...{
              onSubscribe,
              onUnsubscribe,
              onDelete,
              subscribedSlots,
              setCreateEditDialog,
              enableEdit,
              view,
              isCustomer,
            }}
          ></SlotsDay>
        ))}
      </List>
      <SlotCreate
        isoDate={createEditDialog.day}
        slotToEdit={createEditDialog.slotToEdit}
        createSlot={onCreateSlot}
        editSlot={onEditSlot}
        open={createEditDialog.isOpen}
        onClose={onCloseCreateEditDialog}
      ></SlotCreate>
    </>
  );
};

export default SlotListByDay;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
}));
