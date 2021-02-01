import { ORGANIZATION } from "../config/envInfo";

export const wrapOrganization = (toWrap) => {
  return {
    collection: "organizations",
    storeAs: toWrap.storeAs || toWrap.collection,
    doc: ORGANIZATION,
    subcollections: [{ ...toWrap }],
  };
};
