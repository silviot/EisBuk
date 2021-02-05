import React from "react";
import AddCustomer from "./AddCustomer";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";

export default {
  title: "Customer forms",
  component: AddCustomer,
};

const Template = (args) => (
  <MuiPickersUtilsProvider utils={LuxonUtils}>
    <AddCustomer open={true} {...args} />
  </MuiPickersUtilsProvider>
);

export const Empty = Template.bind({});
