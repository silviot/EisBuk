import firebase from "firebase/app";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import React from "react";
import Button from "@material-ui/core/Button";

function invokeFunction(functionName) {
  return function () {
    firebase
      .app()
      .functions()
      .httpsCallable(functionName)({})
      .then(function (response) {
        console.log(response.data);
      });
  };
}

function createAdminTestUsers() {
  // Auth emulator is not currently accessible from within the functions
  firebase.auth().createUserWithEmailAndPassword("test@eisbuk.it", "test00");
}

const debugPage = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4} color="primary">
        <Button
          onClick={createAdminTestUsers}
          color="secondary"
          variant="contained"
        >
          Create admin test users
        </Button>
      </Box>
      <Box my={4} color="secondary.main">
        <Button
          onClick={invokeFunction("createTestData")}
          color="primary"
          variant="contained"
        >
          Create test users
        </Button>
      </Box>
      <Box my={4} color="secondary.main">
        <Button
          onClick={invokeFunction("createTestSlots")}
          color="default"
          variant="contained"
        >
          Create test slots
        </Button>
      </Box>
    </Container>
  );
};
export default debugPage;
