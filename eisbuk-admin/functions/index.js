const admin = require("firebase-admin");
admin.initializeApp();

const importAll = (moduleName) => {
  const module = require(moduleName);
  for (var fname in module) {
    exports[fname] = module[fname];
  }
};
importAll("./test_data.js");
importAll("./data_triggers.js");
importAll("./test_slots.js");
