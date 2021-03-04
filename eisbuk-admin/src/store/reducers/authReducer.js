import { constants } from "react-redux-firebase";

import { IS_ADMIN_RECEIVED } from "../actions/action-types";

const initState = {
  amIAdmin: false,
  myUserId: null,
};

export const authReducer = (state = initState, action) => {
  console.log(state, action);
  switch (action.type) {
    case IS_ADMIN_RECEIVED:
      return {
        ...state,
        amIAdmin: action.payload.amIAdmin,
        myUserId: action.payload.uid,
      };
    case constants.LOGOUT: // Reset state on logout
      return { ...initState };
    default:
      return state;
  }
};
