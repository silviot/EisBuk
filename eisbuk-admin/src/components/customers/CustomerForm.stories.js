import React from "react";
import CustomerForm from "./CustomerForm";

export default {
  title: "Customer forms",
  component: CustomerForm,
};

const Template = (args) => <CustomerForm open={true} {...args} />;

export const Empty = Template.bind({});
Empty.argTypes = {
  updateCustomer: { action: "Customer update" },
  handleClose: { action: "modal closed" },
};

export const EditForm = Template.bind({});
EditForm.args = {
  customer: {
    name: "Gustavo",
    surname: "Fring",
    email: "gus@los-pollos-hermanos.com",
    birth: "1958-04-26",
  },
};
EditForm.argTypes = Empty.argTypes;
