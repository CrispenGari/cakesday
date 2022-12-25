import { constants } from "../../constants";
import { ActionType, ThemeType } from "../../types";

export const themeReducer = (
  state: ThemeType = "light",
  { payload, type }: ActionType<ThemeType>
) => {
  switch (type) {
    case constants.SET_THEME:
      return (state = payload);
    default:
      return state;
  }
};
