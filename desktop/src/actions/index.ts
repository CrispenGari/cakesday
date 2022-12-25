import { constants } from "../constants";
import { Notification } from "../graphql/generated/graphql";
import { ThemeType } from "../types";

export const setEmailCard = (payload: "CHANGE_EMAIL" | "VERIFY_EMAIL") => {
  return {
    payload,
    type: constants.SET_EMAIL_CARD,
  };
};
export const setNotifications = (payload: Notification[]) => {
  return {
    payload,
    type: constants.SET_NOTIFICATIONS,
  };
};

export const setTheme = (payload: ThemeType) => {
  return {
    payload,
    type: constants.SET_THEME,
  };
};
