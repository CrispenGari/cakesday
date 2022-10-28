import { Friend } from "../graphql/generated/graphql";

export interface ActionType<T> {
  payload: T;
  type: string;
}
export interface StateType {
  accessToken: string;
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
  friends?: Friend[];
  __typename: string;
};
