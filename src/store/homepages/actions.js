import { apiUrl } from "../../config/constants";
import axios from "axios";
import { appLoading, appDoneLoading } from "../appState/actions";

export function startLoading() {
  return { type: "START_LOADING", payload: true };
}

export function dataFetched(data) {
  return { type: "LOAD_COMPLETE", payload: data };
}

export async function fetchData(dispatch, getState) {
  dispatch(startLoading());
  dispatch(appLoading);
  const data = await axios.get(`${apiUrl}/homepages`);
  const newData = data.data;
  dispatch(dataFetched(newData));
  dispatch(appDoneLoading);
}
