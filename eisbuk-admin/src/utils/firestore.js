export const wrapOrganization = (toWrap) => {
  console.log(toWrap);
  return {
    collection: "organizations",
    storeAs: toWrap.collection,
    doc: "default", // TODO: support more than one organization
    subcollections: [{ ...toWrap }],
  };
};
