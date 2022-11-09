import { constants } from "../constants";

export const setEmailCard = (payload: "CHANGE_EMAIL" | "VERIFY_EMAIL") => {
  return {
    payload,
    type: constants.SET_EMAIL_CARD,
  };
};
