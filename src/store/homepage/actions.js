import { apiUrl } from "../../config/constants";
import axios from "axios";
import { appLoading, appDoneLoading } from "../appState/actions";

export function startLoading() {
  return { type: "START_HOMEPAGE_LOADING", payload: true };
}

export function dataFetched(data) {
  let stories = data.homepage.Stories;
  let onlyHomepage = { ...data };
  delete onlyHomepage.homepage.Stories;
  return {
    type: "LOAD_HOMEPAGE_COMPLETE",
    payload: {
      homepage: onlyHomepage.homepage,
      stories: stories,
    },
  };
}

export function fetchHomepageData(homepageId) {
  return async function thunk(dispatch, getState) {
    dispatch(startLoading());
    dispatch(appLoading);
    try {
      const data = await axios.get(`${apiUrl}/homepages/${homepageId}/stories`);
      dispatch(dataFetched(data.data));
      dispatch(appDoneLoading);
    } catch (e) {
      console.error(e);
    }
  };
}
