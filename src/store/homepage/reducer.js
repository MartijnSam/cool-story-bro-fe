const initialState = {
  loading: true,
  homepage: [],
  stories: [],
};

export default function homepageSliceReducer(state = initialState, action) {
  switch (action.type) {
    case "START_HOMEPAGE_LOADING": {
      return { ...state, loading: action.payload };
    }
    case "LOAD_HOMEPAGE_COMPLETE": {
      return {
        ...state,
        loading: false,
        homepage: action.payload.homepage,
        stories: action.payload.stories,
      };
    }

    default: {
      return state;
    }
  }
}
