import React from "react";
import SlotsDay from "./SlotsDay";

const SlotListByDay = ({
  slots,
  onDelete,
  onSubscribe,
  onUnsubscribe,
  subscribedSlots,
}) => {
  if (typeof slots === "undefined") {
    return <div>Loading...</div>;
  }
  const days = Object.keys(slots)
    .filter((el) => el !== "id")
    .sort();
  return (
    <>
      {days.map((el) => (
        <SlotsDay
          key={el}
          day={el}
          slots={slots[el]}
          {...{ onSubscribe, onUnsubscribe, onDelete, subscribedSlots }}
        ></SlotsDay>
      ))}
    </>
  );
};

export default SlotListByDay;
