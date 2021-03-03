import { constants } from "react-redux-firebase";

import { IS_ADMIN_RECEIVED } from "../actions/action-types";

const initState = {
  amIAdmin: false,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case IS_ADMIN_RECEIVED:
      return { ...state, amIAdmin: action.payload.amIAdmin };
    case constants.LOGIN: // Reset state on login
      return { ...initState };
    default:
      return state;
  }
};
