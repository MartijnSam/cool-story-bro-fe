const initialState = {
  loading: true,
  homepages: [],
};

export default function homepagesSliceReducer(state = initialState, action) {
  switch (action.type) {
    case "START_LOADING": {
      return { ...state, loading: action.payload };
    }
    case "LOAD_COMPLETE": {
      return { ...state, loading: false, homepages: action.payload.homepages };
    }

    default: {
      return state;
    }
  }
}
