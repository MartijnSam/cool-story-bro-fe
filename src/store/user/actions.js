import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectUserHomepage } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const NEW_STORY_SUCCESS = "NEW_STORY_SUCCESS";
export const UPDATE_HOMEPAGE_SUCCESS = "UPDATE_HOMEPAGE_SUCCESS";

const loginSuccess = (userWithToken) => {
  let stories = userWithToken.Homepage.Stories;
  delete userWithToken.Homepage.Stories;
  let homepage = userWithToken.Homepage;
  delete userWithToken.Homepage;
  return {
    type: LOGIN_SUCCESS,
    payload: {
      userWithToken: userWithToken,
      stories: stories,
      homepage: homepage,
    },
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password, title) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
        title,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`this gives the db:`, response);
      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

const updateHomepageSuccess = (newHomepage) => {
  return {
    type: UPDATE_HOMEPAGE_SUCCESS,
    payload: {
      newHomepage,
    },
  };
};

export const updateUserHomepage = (
  newTitle,
  newDescription,
  newBackgroundColor,
  newColor
) => {
  return async (dispatch, getState) => {
    const homepageId = selectUserHomepage(getState()).id;
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;
    let title = newTitle ? newTitle : getState().user.homepage.title;
    let description = newDescription
      ? newDescription
      : getState().user.homepage.description;
    let backgroundColor = newBackgroundColor
      ? newBackgroundColor
      : getState().user.homepage.backgroundColor;
    let color = newColor ? newColor : getState().user.homepage.color;
    try {
      const response = await axios.patch(
        `${apiUrl}/homepages/${homepageId}`,
        {
          title,
          description,
          backgroundColor,
          color,
        },

        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(updateHomepageSuccess(response.data));
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Your homepages has been updated!",
          1500
        )
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
    }
  };
};

const storyAddSuccess = (newStory) => {
  return {
    type: NEW_STORY_SUCCESS,
    payload: {
      newStory,
    },
  };
};

export const addStory = (name, content, imgUrl) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    const homepageId = selectUserHomepage(getState()).id;

    if (token === null) return;
    dispatch(appLoading());
    try {
      const response = await axios.post(
        `${apiUrl}/homepages/${homepageId}/stories`,
        { name, content, imgUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Your story has been added!",
          1500
        )
      );
      dispatch(storyAddSuccess(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};
