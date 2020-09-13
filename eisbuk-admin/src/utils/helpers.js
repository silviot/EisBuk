import moment from "moment";

export const getInitials = (name, surname) => {
  return `${name[0]}${surname[0]}`;
};

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

export const m = (m) => {
  return moment(m).locale("it");
};
