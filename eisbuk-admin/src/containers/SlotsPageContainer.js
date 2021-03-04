import { Badge, Container, IconButton, Switch } from "@material-ui/core";
import {
  FileCopy as FileCopyIcon,
  Assignment as AssignmentIcon,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SlotListByDay from "../components/slots/SlotListByDay";

import { makeStyles } from "@material-ui/core/styles";
import { DateTime } from "luxon";

import DateNavigationAppBar from "./DateNavigationAppBar";
import { calendarDaySelector } from "../store/selectors";
import { shiftSlotsWeek } from "../data/slotutils.js";
import { copySlotWeek, createSlots } from "../store/actions/actions";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {},
  slotlist: {
    "& > li.MuiListSubheader-sticky": {
      top: theme.mixins.toolbar.minHeight,
    },
  },
}));

const weekCopyPasteSelector = (state) => state.copyPaste.week ?? {};

export default ({
  slots,
  onDelete,
  onSubscribe,
  onUnsubscribe,
  onCreateSlot,
  subscribedSlots,
  view,
  isCustomer,
}) => {
  const classes = useStyles();
  const [enableEdit, setEnableEdit] = useState(false);
  const currentDate = useSelector(calendarDaySelector).startOf("week");
  const weekToPaste = useSelector(weekCopyPasteSelector);
  const dispatch = useDispatch();

  const datesToDisplay = [...Array(7).keys()].map((i) =>
    currentDate.plus({ days: i }).toISODate()
  );
  const slotsToDisplay = datesToDisplay.reduce(function (obj, x) {
    return { ...obj, [x]: {} };
  }, {});
  var slotsToCopy = [];
  var numSlots = 0;
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
        numSlots += _.size(_.omit(slot, "id"));
        slotsToCopy = slotsToCopy.concat(_.values(_.omit(slot, "id")));
      }
    }
  }
  const doPaste = () =>
    dispatch(
      createSlots(
        shiftSlotsWeek(weekToPaste.slots, weekToPaste.weekStart, currentDate)
      )
    );
  const switchButton = onDelete ? (
    <Switch
      edge="end"
      onChange={() => {
        setEnableEdit(!enableEdit);
      }}
      checked={enableEdit}
    />
  ) : null;
  const extraButtons = (
    <>
      {enableEdit && (
        <IconButton
          variant="outlined"
          size="small"
          disabled={numSlots === 0}
          onClick={() =>
            dispatch(
              copySlotWeek({ weekStart: currentDate, slots: slotsToCopy })
            )
          }
        >
          <Badge
            color="secondary"
            variant="dot"
            invisible={!Boolean(weekToPaste && weekToPaste.slots)}
          >
            <FileCopyIcon />
          </Badge>
        </IconButton>
      )}
      {enableEdit && (
        <IconButton
          variant="outlined"
          size="small"
          onClick={doPaste}
          tooltip="Incolla settimana"
          disabled={
            !weekToPaste.weekStart ||
            +weekToPaste.weekStart === +currentDate ||
            numSlots !== 0
          }
        >
          <AssignmentIcon />
        </IconButton>
      )}
      {switchButton}
    </>
  );

  return (
    <>
      <DateNavigationAppBar extraButtons={extraButtons} />

      <Container maxWidth="xl">
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
            view,
            isCustomer,
          }}
        />
      </Container>
    </>
  );
};

const ONE_WEEK = 7 * 24 * 60 * 60;
