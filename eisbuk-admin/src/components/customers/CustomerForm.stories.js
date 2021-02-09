import React from "react";
import CustomerForm from "./CustomerForm";

export default {
  title: "Customer forms",
  component: CustomerForm,
};

const Template = (args) => <CustomerForm open={true} {...args} />;

export const Empty = Template.bind({});

export const EditForm = Template.bind({});
EditForm.args = {
  customer: {
    name: "Gus",
    surname: "Fring",
    email: "gus@los-pollos-hermanos.com",
  },
};
