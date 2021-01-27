export const wrapOrganization = (toWrap) => {
  return {
    collection: "organizations",
    storeAs: toWrap.storeAs || toWrap.collection,
    doc: "default", // TODO: support more than one organization
    subcollections: [{ ...toWrap }],
  };
};
