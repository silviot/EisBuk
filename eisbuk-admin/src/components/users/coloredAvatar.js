import React from "react";

import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import {
  blue,
  red,
  yellow,
  green,
  orange,
  purple,
} from "@material-ui/core/colors";

import { getInitials } from "../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  blue: {
    backgroundColor: blue[900],
    color: theme.palette.getContrastText(blue[900]),
  },
  red: {
    backgroundColor: red[900],
    color: theme.palette.getContrastText(red[900]),
  },
  yellow: {
    backgroundColor: yellow[900],
    color: theme.palette.getContrastText(yellow[900]),
  },
  green: {
    backgroundColor: green[900],
    color: theme.palette.getContrastText(green[900]),
  },
  orange: {
    backgroundColor: orange[900],
    color: theme.palette.getContrastText(orange[900]),
  },
  purple: {
    backgroundColor: purple[900],
    color: theme.palette.getContrastText(purple[900]),
  },
}));

const avatarColors = ["blue", "red", "yellow", "green", "orange", "purple"];

export const ColoredAvatar = ({ name, surname }) => {
  let classes = useStyles();
  let str = name + surname;
  let h = 0;
  for (var i = 0; i < str.length; i++) {
    h = str.charCodeAt(i) + ((h << 5) - h);
  }
  h = h & h;
  h = Math.abs(h) % avatarColors.length;
  return (
    <Avatar className={classes[avatarColors[h]]}>
      {getInitials(name, surname)}
    </Avatar>
  );
};

export default ColoredAvatar;
