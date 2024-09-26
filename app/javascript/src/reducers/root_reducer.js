import { combineReducers } from "redux";

import entities from "./entities_reducer";
import errors from "./errors_reducer";
import flash from "./flash_reducer";
import session from "./session_reducer";

export default combineReducers({
  entities,
  errors,
  flash,
  session
});