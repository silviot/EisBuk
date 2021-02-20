import {
  ENQUEUE_SNACKBAR,
  CLOSE_SNACKBAR,
  REMOVE_SNACKBAR,
  CHANGE_DAY,
  SET_SLOT_TIME,
} from "../actions/action-types";
import { DateTime } from "luxon";

const defaultState = {
  notifications: [],
  calendarDay: DateTime.local(),
  newSlotTime: null,
};

export const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification,
          },
        ],
      };

    case CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        ),
      };

    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.key !== action.key
        ),
      };

    case CHANGE_DAY:
      return {
        ...state,
        calendarDay: action.payload,
      };

    case SET_SLOT_TIME:
      return {
        ...state,
        newSlotTime: action.payload,
      };

    default:
      return state;
  }
};

export default appReducer;
