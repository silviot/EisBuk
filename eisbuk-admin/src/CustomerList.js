import firebase from "firebase";
import React from "react";
import Paper from "@material-ui/core/Paper";

function CustomerList() {
  const [customers, setCustomers] = React.useState([{ name: "loading" }]);
  React.useEffect(() => {
    var db = firebase.firestore();
    db.collection("customers").onSnapshot(function (querySnapshot) {
      const new_customers = [];
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        new_customers.push({ id: doc.id, ...doc.data() });
      });
      setCustomers(new_customers);
    });
  }, []);

  return (
    <Paper>
      <h3 key="header">Customers</h3>
      {customers.map((customer) => (
        <div key={customer.id}>{customer.name}</div>
      ))}
    </Paper>
  );
}

export default CustomerList;
