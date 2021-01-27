import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import SlotsDay from "./SlotsDay";

const SlotListByDay = ({
  slots,
  onDelete,
  onSubscribe,
  onUnsubscribe,
  subscribedSlots,
  onCreateSlot,
  className,
}) => {
  const classes = useStyles();
  if (typeof slots === "undefined") {
    return <div>Loading...</div>;
  }
  const days = Object.keys(slots)
    .filter((el) => el !== "id")
    .sort();
  return (
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
            onCreateSlot,
          }}
        ></SlotsDay>
      ))}
    </List>
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
