import { constants } from "../constants";
import { Notification } from "../graphql/generated/graphql";

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
