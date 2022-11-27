import { constants } from "../../constants";
import { ActionType } from "../../types";

export const emailCardReducer = (
  state: "CHANGE_EMAIL" | "VERIFY_EMAIL" = "CHANGE_EMAIL",
  { payload, type }: ActionType<"CHANGE_EMAIL" | "VERIFY_EMAIL">
) => {
  switch (type) {
    case constants.SET_EMAIL_CARD:
      return (state = payload);
    default:
      return state;
  }
};
