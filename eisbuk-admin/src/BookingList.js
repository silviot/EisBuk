import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import firebase from "firebase";
import React from "react";

function BookingList() {
  const [bookings, setBookings] = React.useState([]);
  React.useEffect(() => {
    var db = firebase.firestore();
    db.collectionGroup("data")
      .orderBy("start", "desc")
      .limit(10)
      .onSnapshot(function (querySnapshot) {
        const new_bookings = [];
        querySnapshot.forEach(function (doc) {
          new_bookings.push({ id: doc.id, ...doc.data() });
        });
        setBookings(new_bookings);
      });
  }, []);
  return (
    <List>
      <ListItem key="header">
        <ListItemText primary="Prenotazioni"></ListItemText>
      </ListItem>
      {bookings.map((customer) => (
        <ListItem key={customer.id}>
          <ListItemText
            primary={customer.start + " " + customer.duration}
          ></ListItemText>
        </ListItem>
      ))}
    </List>
  );
}

export default BookingList;
