import { constants } from "../../constants";
import { ActionType } from "../../types";

export const accessTokenReducer = (
  state: string = "",
  { payload, type }: ActionType<string>
) => {
  switch (type) {
    case constants.SET_ACCESS_TOKEN:
      return (state = payload);
    default:
      return state;
  }
};
