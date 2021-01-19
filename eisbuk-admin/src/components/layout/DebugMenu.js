import React from "react";
import firebase from "firebase/app";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { BugReport as BugReportIcon } from "@material-ui/icons";

export default () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (functionName) => (evt) => {
    setAnchorEl(null);
    if (functionName) {
      firebase
        .app()
        .functions()
        .httpsCallable(functionName)({})
        .then(function (response) {
          console.log(response.data);
        });
    }
  };

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        startIcon={<BugReportIcon />}
        onClick={handleClick}
      >
        Debug
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose()}
      >
        <MenuItem onClick={handleClose("createTestData")}>
          Create athlete
        </MenuItem>
        <MenuItem onClick={handleClose("createTestSlots")}>
          Create slots
        </MenuItem>
      </Menu>
    </>
  );
};