import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import firebase from "firebase";
import React from "react";

function CustomerList() {
  const [customers, setCustomers] = React.useState([]);
  React.useEffect(() => {
    var db = firebase.firestore();
    db.collection("customers")
      .orderBy("id", "desc")
      .limit(5)
      .onSnapshot(function (querySnapshot) {
        const new_customers = [];
        querySnapshot.forEach(function (doc) {
          new_customers.push({ id: doc.id, ...doc.data() });
        });
        setCustomers(new_customers);
      });
  }, []);
  return (
    <List>
      <ListItem key="header">
        <ListItemText primary="Clienti"></ListItemText>
      </ListItem>
      {customers.map((customer) => (
        <ListItem key={customer.id}>
          <ListItemAvatar>
            <Avatar>
              {(customer.name || " ")[0] + (customer.surname || " ")[0]}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={customer.name + " " + customer.surname}
          ></ListItemText>
        </ListItem>
      ))}
    </List>
  );
}

export default CustomerList;
