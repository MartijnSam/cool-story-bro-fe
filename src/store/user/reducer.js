import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  NEW_STORY_SUCCESS,
  UPDATE_HOMEPAGE_SUCCESS,
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  homepage: {},
  stories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log(action.payload);
      localStorage.setItem("token", action.payload.userWithToken.token);
      return {
        ...state,
        ...action.payload.userWithToken,
        homepage: action.payload.homepage,
        stories: action.payload.stories,
      };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case NEW_STORY_SUCCESS:
      return { ...state, stories: [...state.stories, action.payload.newStory] };

    case UPDATE_HOMEPAGE_SUCCESS:
      return { ...state, homepage: action.payload.newHomepage };

    default:
      return state;
  }
};
