import { Notification } from "../graphql/generated/graphql";

export type ThemeType = "dark" | "light";
export interface ActionType<T> {
  payload: T;
  type: string;
}
export interface StateType {
  emailCard: "CHANGE_EMAIL" | "VERIFY_EMAIL";
  notifications: Notification[];
}
export interface EmojiType {
  name: string;
  code: string;
}

export interface BirthdayType {
  isBirthday: boolean;
  formattedBirthday: string;
  age: number;
}

export enum BirthdayCardType {
  BASIC_CARD = "BASIC",
  TEDDY_CARD = "TEDDY",
  ROCKET_CARD = "ROCKET",
  CAT_CARD = "CAT",
  ICE_CREAM_CARD = "ICE_CREAM",
  HEART_CARD = "HEART",
  PLANETS_CARD = "PLANETS",
  BALLON_CARD = "BALLON",
  SHOOTING_STAR_CARD = "SHOOTING_STAR",
  CANDLES_CARD = "CANDLES",
}

export enum NotificationType {
  NEW_FOLLOWER = "new_follower",
  NEW_FRIEND = "new_friend",
  BIRTHDAY_CARD = "birthday_card",
  CARD_REACTION = "birthday_card_reaction",
}
