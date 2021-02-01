// Provide information about the environment we're running in

export const isDev =
  window.location.port !== "" &&
  window.location.port !== "80" &&
  window.location.port !== "443";

export const functionsZone = isDev ? undefined : "europe-west6";

export const ORGANIZATION = window.location.hostname;
