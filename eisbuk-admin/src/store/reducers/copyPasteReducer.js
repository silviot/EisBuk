import { COPY_SLOT_DAY } from "../actions/action-types";

const defaultState = {
  day: null,
  week: null,
};

export const copyPasteReducer = (state = defaultState, action) => {
  switch (action.type) {
    case COPY_SLOT_DAY:
      return { ...state, day: { ...action.payload } };
    default:
      return state;
  }
};

export default copyPasteReducer;
