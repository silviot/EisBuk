import { IS_ADMIN_RECEIVED } from "../actions/action-types";

const initState = {
  amIAdmin: false,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case IS_ADMIN_RECEIVED:
      console.log(`Is admin: ${action.payload.amIAdmin}`);
      return { ...state, amIAdmin: action.payload.amIAdmin };
    default:
      return state;
  }
};
