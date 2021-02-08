import React from "react";
import CustomerList from "./CustomerList";
import FIRST_NAMES from "../../data/italian-names.json";
import LAST_NAMES from "../../data/italian-surnames.json";
import _ from "lodash";
import seedrandom from "seedrandom";
import { v4 as uuidv4 } from "uuid";

const PRNG = seedrandom("foobar");

/* Alter Math.random to refer to seedrandom's PRNG. */
Math.random = PRNG;
/* Assign a new Lodash context to a separate variable AFTER altering Math.random. */
var lodash = _.runInContext();

const CATEGORIES = ["corso", "agonismo", "preagonismo"];

export default {
  title: "Customer list",
  component: CustomerList,
};

const Template = (args) => <CustomerList open={true} {...args} />;

export const Empty = Template.bind({});
Empty.args = { customers: [] };

export const ACouple = Template.bind({});
ACouple.args = { customers: [createDemoCustomer(), createDemoCustomer()] };

export const Ten = Template.bind({});
Ten.args = { customers: _.range(10).map(createDemoCustomer) };

export const AHundred = Template.bind({});
AHundred.args = { customers: _.range(100).map(createDemoCustomer) };

function createDemoCustomer() {
  const name = lodash.sample(FIRST_NAMES);
  const surname = lodash.sample(LAST_NAMES);
  return {
    name,
    surname,
    email: lodash
      .deburr(`${name}.${surname}@example.com`.toLowerCase())
      .replace(" ", "."),
    id: uuidv4(),
    category: lodash.sample(CATEGORIES),
  };
}

export const TenWithEdit = Template.bind({});
TenWithEdit.args = { customers: _.range(10).map(createDemoCustomer) };
TenWithEdit.argTypes = {
  onDeleteCustomer: { action: "deleted" },
  onEditCustomer: { action: "modified" },
};
