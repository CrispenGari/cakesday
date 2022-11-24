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

export type SettingsType = {
  id: number;
  __typename: string;
  theme: "dark" | "light";
};

export type ProfileType = {
  id: number;
  email: string;
  username: string;
  photoURL?: string;
  bannerURL?: string;
  bio?: string;
  bday: string;
  verified: boolean;
  gender: string;
  __typename: string;
};

export type FollowerType = {} & ProfileType;
export type FollowingType = {} & ProfileType;

export type UserType = {
  username: string;
  id: number;
  email: string;
  isLoggedIn: boolean;
  confirmed: boolean;
  createdAt: string;
  updatedAt: string;
  settings?: SettingsType;
  profile?: ProfileType;
  followers?: FollowerType[];
  followings?: FollowingType[];
  __typename: string;
};

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
