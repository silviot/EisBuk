import _ from "lodash";

// These definition drive the UI.
// We define them as arrays to be able to specify an order
export const slotsLabelsLists = {
  durations: [
    { id: 60, label: "1H", minutes: 50 },
    { id: 90, label: "1H½", minutes: 80 },
    { id: 120, label: "2H", minutes: 110 },
  ],
  categories: [
    { id: "corso", label: "Corso" },
    { id: "preagonismo", label: "Preagonismo" },
    { id: "agonismo", label: "Agonismo" },
  ],
  types: [
    { id: "ice", label: "Ice" },
    { id: "off-ice-danza", label: "OFF Ice Danza" },
    { id: "off-ice-gym", label: "OFF Ice Gym" },
  ],
};

// But we often need a map, so we build one here.
export const slotLabels = {};
Object.keys(slotsLabelsLists).forEach((el) => {
  slotLabels[el] = _.keyBy(slotsLabelsLists[el], "id");
});
