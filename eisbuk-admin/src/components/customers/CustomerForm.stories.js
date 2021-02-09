import React from "react";
import CustomerForm from "./CustomerForm";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";

export default {
  title: "Customer forms",
  component: CustomerForm,
};

const Template = (args) => (
  <MuiPickersUtilsProvider utils={LuxonUtils}>
    <CustomerForm open={true} {...args} />
  </MuiPickersUtilsProvider>
);

export const Empty = Template.bind({});
