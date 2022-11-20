import { constants } from "../../constants";
import { Notification } from "../../graphql/generated/graphql";
import { ActionType } from "../../types";

export const notificationsReducer = (
  state: Notification[] = [],
  { payload, type }: ActionType<Notification[]>
) => {
  switch (type) {
    case constants.SET_NOTIFICATIONS:
      return (state = payload);
    default:
      return state;
  }
};
