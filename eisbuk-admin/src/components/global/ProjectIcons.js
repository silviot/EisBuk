import React from "react";
import { AcUnit, AccessibilityNew, FitnessCenter } from "@material-ui/icons";

const ProjectIcon = (props) => {
  switch (props.icon) {
    case "AcUnit":
      return <AcUnit {...props} />;
    case "AccessibilityNew":
      return <AccessibilityNew {...props} />;
    case "FitnessCenter":
      return <FitnessCenter {...props} />;
    default:
      return null;
  }
};

export default ProjectIcon;
