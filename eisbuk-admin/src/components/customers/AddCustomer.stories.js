import React from "react";
import AddCustomer from "./AddCustomer";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import { igorice } from "../../App.js";

export default {
  title: "Customer forms",
  component: AddCustomer,
};

const Template = (args) => (
  <ThemeProvider theme={igorice}>
    <MuiPickersUtilsProvider utils={LuxonUtils}>
      <AddCustomer open={true} {...args} />
    </MuiPickersUtilsProvider>
  </ThemeProvider>
);

export const Empty = Template.bind({});
