import { Box, Switch } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import SlotListByDay from "../components/slots/SlotListByDay";

import { makeStyles } from "@material-ui/core/styles";
import { DateTime } from "luxon";

import DateNavigationAppBar from "./DateNavigationAppBar";
import { calendarDaySelector } from "../store/selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "600px",
  },
  slotlist: {
    "& > li.MuiListSubheader-sticky": {
      top: theme.mixins.toolbar.minHeight,
    },
  },
}));

export default ({
  slots,
  onDelete,
  onSubscribe,
  onUnsubscribe,
  onCreateSlot,
  subscribedSlots,
}) => {
  const classes = useStyles();
  const [enableEdit, setEnableEdit] = useState(false);
  const currentDate = useSelector(calendarDaySelector);

  const datesToDisplay = [...Array(7).keys()].map((i) =>
    currentDate.plus({ days: i }).toISODate()
  );
  const slotsToDisplay = datesToDisplay.reduce(function (obj, x) {
    return { ...obj, [x]: {} };
  }, {});
  for (const key in slots) {
    if (Object.hasOwnProperty.call(slots, key)) {
      const slot = slots[key];
      let dayDateTime;
      try {
        dayDateTime = DateTime.fromFormat(key, "yyyy-LL-dd");
      } catch (e) {
        continue;
      }
      const diff = (dayDateTime - currentDate) / 1000;
      if (diff >= 0 && diff < ONE_WEEK) {
        slotsToDisplay[key] = slot;
      }
    }
  }
  const switchButton = onDelete ? (
    <Switch
      edge="end"
      onChange={() => {
        setEnableEdit(!enableEdit);
      }}
      checked={enableEdit}
    />
  ) : null;

  return (
    <Box className={classes.root}>
      <DateNavigationAppBar extraButtons={switchButton} />
      <Box>
        <SlotListByDay
          className={classes.slotlist}
          slots={slotsToDisplay}
          onDelete={onDelete}
          {...{
            onSubscribe,
            onUnsubscribe,
            subscribedSlots,
            onCreateSlot,
            enableEdit,
          }}
        />
      </Box>
    </Box>
  );
};

const ONE_WEEK = 7 * 24 * 60 * 60;
