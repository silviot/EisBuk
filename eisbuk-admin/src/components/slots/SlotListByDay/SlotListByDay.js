import React from "react";
import SlotsDay from "./SlotsDay";

const SlotListByDay = ({
  slots,
  currentDate,
  onDelete,
  onSubscribe,
  onUnsubscribe,
}) => {
  if (typeof slots === "undefined") {
    return <div>Loading...</div>;
  }
  const days = Object.keys(slots)
    .filter((el) => el !== "id")
    .sort();
  const current = currentDate.toISODate();
  return (
    <>
      {days.map((el) => (
        <SlotsDay
          key={el}
          day={el}
          slots={slots[el]}
          onDelete={onDelete}
          isCurrent={current === el}
          onSubscribe={onSubscribe}
          onUnsubscribe={onUnsubscribe}
        ></SlotsDay>
      ))}
    </>
  );
};

export default SlotListByDay;
