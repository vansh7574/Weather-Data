import { combineReducers } from "redux";
// slices
import sharedReducer from "./slices/shared";
// ----------------------------------------------------------------------

const rootReducer = combineReducers({
  shared: sharedReducer,
});

export { rootReducer };
