import _ from "lodash";
// Provide information about the environment we're running in

export var isDev, functionsZone, ORGANIZATION;

if (_.isNil(process.env.EISBUK_SITE)) {
  isDev =
    window.location.port !== "" &&
    window.location.port !== "80" &&
    window.location.port !== "443";

  functionsZone = isDev ? undefined : "europe-west6";

  ORGANIZATION = window.location.hostname;
} else {
  isDev = false;
  functionsZone = "europe-west6";
  ORGANIZATION = process.env.EISBUK_SITE;
  console.log(
    `Using ${ORGANIZATION} as organization as specified in EISBUK_SITE environment variable`
  );
}

// Unfortunately Babel caches the compiled version of this file until the file changes.
// But we'd like the file to be recompiled when an environment variable changes.
// So we came up with this ugly hack: a string in this file that has no impact on the code,
// and can be changed by the startup script.
// Date this was last changed: Tue 23 Feb 2021 12:10:06 PM CET
