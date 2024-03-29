import { combineReducers, Store, legacy_createStore } from "redux";
import { ActionType, StateType } from "../types";
import { emailCardReducer } from "./emailCardReducer";
import { notificationsReducer } from "./notificationsReducer";
import { themeReducer } from "./themeReducer";

export const store: Store<StateType, ActionType<any>> = legacy_createStore(
  combineReducers({
    emailCard: emailCardReducer,
    notifications: notificationsReducer,
    theme: themeReducer,
  })
);
