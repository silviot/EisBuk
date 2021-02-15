import React from "react";
import CustomerAreaBookingCard from "./CustomerAreaBookingCard";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({}));

const CustomerAreaBookings = () => {
  const classes = useStyles();
  return <CustomerAreaBookingCard />;
};

export default CustomerAreaBookings;
