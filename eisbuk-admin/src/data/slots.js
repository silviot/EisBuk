export const SlotCategory = {
  Corso: "corso",
  Preagonismo: "preagonismo",
  Agonismo: "agonismo",
};

export const SlotType = {
  Ice: "ice",
  "OFF Ice Danza": "off-ice-danza",
  "OFF Ice Gym": "off-ice-gym",
};

export const SlotDuration = {
  "1 h": "60",
  "1 ½ h": "90",
  "2 h": "120",
};

if (Object.freeze) {
  Object.freeze(SlotCategory);
  Object.freeze(SlotDuration);
  Object.freeze(SlotType);
}
