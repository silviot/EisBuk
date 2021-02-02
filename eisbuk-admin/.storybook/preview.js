import React from "react";
import { store } from "../src/store/store";
import { StoryRouter } from "storybook-react-router";
import { Provider } from "react-redux";
import { changeCalendarDate } from "../src/store/actions/actions";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story, context) => {
    if (context.args.currentDate) {
      store.dispatch(changeCalendarDate(context.args.currentDate));
    }
    return (
      <Provider store={store}>
        <StoryRouter>
          <Story />
        </StoryRouter>
      </Provider>
    );
  },
];
