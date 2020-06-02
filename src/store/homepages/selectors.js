export const selectLoadStatus = (state) => {
  return state.homepages.loading;
};

export const selectHomepages = (state) => {
  return state.homepages.homepages;
};
