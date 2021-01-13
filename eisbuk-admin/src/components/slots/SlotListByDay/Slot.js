import React from "react";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CategoryIcon from "@material-ui/icons/Category";
import StarsIcon from "@material-ui/icons/Stars";
import LuxonUtils from "@date-io/luxon";
import Chip from "@material-ui/core/Chip";
import { deleteSlot } from "../../../store/actions/actions";

const luxon = new LuxonUtils({ locale: "C" });

const Slot = ({ data, deleteSlot }) => {
  const date = FBToLuxon(data.date);
  const handleDelete = (e) => {
    e.preventDefault();
    deleteSlot(data.id);
  };

  return (
    <Box>
      <Chip
        onDelete={handleDelete}
        icon={<AccessTimeIcon />}
        label={date.toISOTime().substring(0, 5)}
      />
      <Chip size="small" icon={<CategoryIcon />} label={data.category} />
      <Chip size="small" icon={<StarsIcon />} label={data.type} />
      {data.durations.map((val) => (
        <Chip size="small" label={val} />
      ))}
    </Box>
  );
};

function FBToLuxon(fbDatetime) {
  return luxon.date(new Date(fbDatetime.seconds * 1000));
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSlot: (id) => dispatch(deleteSlot(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Slot);
