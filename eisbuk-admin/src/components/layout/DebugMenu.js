import React from "react";
import firebase from "firebase/app";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { BugReport as BugReportIcon } from "@material-ui/icons";
import { functionsZone } from "../../config/envInfo";
import { ORGANIZATION } from "../../config/envInfo";

export default () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (functionName, params) => (evt) => {
    setAnchorEl(null);
    if (functionName) {
      firebase
        .app()
        .functions(functionsZone)
        .httpsCallable(functionName)({ ...params, organization: ORGANIZATION })
        .then(function (response) {
          console.log(response.data);
        });
    }
  };

  return (
    <>
      <Button
        color="secondary"
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
          Create 1 athlete
        </MenuItem>
        <MenuItem onClick={handleClose("createTestData", { howMany: 100 })}>
          Create 100 athletes
        </MenuItem>
        <MenuItem onClick={handleClose("createTestSlots")}>
          Create slots
        </MenuItem>
      </Menu>
    </>
  );
};
