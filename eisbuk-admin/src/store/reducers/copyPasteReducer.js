import { COPY_SLOT_DAY, COPY_SLOT_WEEK } from "../actions/action-types";

const defaultState = {
  day: null,
  week: null,
};

export const copyPasteReducer = (state = defaultState, action) => {
  switch (action.type) {
    case COPY_SLOT_DAY:
      return { ...state, day: { ...action.payload } };
    case COPY_SLOT_WEEK:
      return { ...state, week: { ...action.payload } };
    default:
      return state;
  }
};

export default copyPasteReducer;
