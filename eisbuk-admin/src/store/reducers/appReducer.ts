import {
  CLOSE_SNACKBAR,
  REMOVE_SNACKBAR,
  CHANGE_DAY,
  SET_SLOT_TIME,
} from "../actions/action-types";
import { DateTime } from "luxon";
import { Action } from "@/enums/Redux";

const defaultState = {
  notifications: [],
  calendarDay: DateTime.local(),
  newSlotTime: null,
};

type Notification = any;

export interface AppState {
  calendarDay: DateTime;
  newSlotTime: null;
  notifications: Notification[];
}

export interface AppActionInterface {
  type: Action;
  notification: Notification;
  key: string;
  /** @TEMP below */
  dismissAll: any;
  payload: any;
}

export const appReducer = (
  state: AppState = defaultState,
  action: AppActionInterface
) => {
  switch (action.type) {
    case Action.EnqueueSnackbar:
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
