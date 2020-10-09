import firebase from "firebase/app";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import React from "react";
import Button from "@material-ui/core/Button";


function createTestUsers() {
    firebase.app().functions().httpsCallable("createTestData")({});
}

function createTestSlots() {
    firebase.app().functions().httpsCallable("createTestSlots")({}).then(function(response){
        console.log(response.data)

    });
}

const debugPage = () => {

    window.moment = moment
    return (
        <Container maxWidth="sm">
            <Box my={4} color="secondary.main">
                <Button onClick={createTestUsers} color="primary">Create test users</Button>
            </Box>
            <Box my={4} color="secondary.main">
                <Button onClick={createTestSlots} color="primary">Create test slots</Button>
            </Box>
        </Container>
    )
}
export default debugPage