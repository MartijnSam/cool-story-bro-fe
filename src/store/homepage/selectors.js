export const selectLoadStatus = (state) => {
  return state.homepage.loading;
};

export const selectHomepage = (state) => {
  return state.homepage.homepage;
};

export const selectStories = (state) => {
  return state.homepage.stories;
};
