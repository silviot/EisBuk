import React from "react";
import { store } from "../src/store/store";
import { StoryRouter } from "storybook-react-router";
import { Provider } from "react-redux";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <StoryRouter>
        <Story />
      </StoryRouter>
    </Provider>
  ),
];
