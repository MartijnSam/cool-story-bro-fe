import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import homepages from "./homepages/reducer";
import homepage from "./homepage/reducer";

export default combineReducers({
  appState,
  user,
  homepages,
  homepage,
});
