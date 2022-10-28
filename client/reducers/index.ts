import { combineReducers, Store, legacy_createStore } from "redux";
import { ActionType, StateType } from "../types";
import { accessTokenReducer } from "./accessTokenReducer";

export const store: Store<StateType, ActionType<any>> = legacy_createStore(
  combineReducers({
    accessToken: accessTokenReducer,
  })
);
