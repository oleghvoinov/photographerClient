import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import { userReducer } from "./userReducer";
import { mainFileReducer } from "./mainFileReducer";
import { dirFileReducer } from "./dirFileReducer";

const rootReducer = combineReducers({
  user: userReducer,
  mainFiles: mainFileReducer,
  dirs: dirFileReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
