import { IS_LOADING, HAS_LOADED } from "../actions/action-types";

const initState = {
  isLoading: false,
};

export const appReducer = (state = initState, action) => {
  switch (action.type) {
    case IS_LOADING:
      console.log("Loading");
      return {
        isLoading: true,
        ...state,
      };
    case HAS_LOADED:
      console.log("Loaded");
      return {
        isLoading: false,
        ...state,
      };
    default:
      return state;
  }
};
