import React from "react";
import Box from "@material-ui/core/Box";
import SlotsDay from "./SlotsDay";

const SlotListByDay = ({
  slots,
  currentDate,
  onDelete,
  onSubscribe,
  onUnsubscribe,
}) => {
  if (typeof slots === "undefined") {
    return <Box>Loading...</Box>;
  }
  const days = Object.keys(slots)
    .filter((el) => el !== "id")
    .sort();
  const current = currentDate.toISODate();
  return (
    <Box>
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
    </Box>
  );
};

export default SlotListByDay;
