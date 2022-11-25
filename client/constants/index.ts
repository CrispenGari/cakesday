import { BirthdayCardType } from "../types";

export interface FreeCardType {
  imagePath: string;
  cardType: BirthdayCardType;
}
export const freeCards: FreeCardType[] = [
  {
    cardType: BirthdayCardType.BASIC_CARD,
    imagePath: "http://localhost:3001/storage/images/cards/basic.png",
  },
  {
    cardType: BirthdayCardType.TEDDY_CARD,
    imagePath: "http://localhost:3001/storage/images/cards/teddy.png",
  },
  {
    cardType: BirthdayCardType.HEART_CARD,
    imagePath: "http://localhost:3001/storage/images/cards/heart.png",
  },
  {
    cardType: BirthdayCardType.BALLON_CARD,
    imagePath: "http://localhost:3001/storage/images/cards/baloons.png",
  },
];

export const constants = {
  SET_EMAIL_CARD: "SET_EMAIL_CARD",
  SET_NOTIFICATIONS: "SET_NOTIFICATIONS",
  SET_THEME: "SET_THEME",
};
export const privacyOptions = ["only me", "friends", "everyone", "followers"];
export const genders = ["male", "female", "transgender"];

export const __server__base__url__: string = "http://localhost:3001";
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export enum EmotionType {
  LOVE = "LOVE",
  LIKE = "LIKE",
  BLUSH = "BLUSH",
  HAHA = "HAHA",
  ICE_CREAM = "ICE_CREAM",
  CAKE = "CAKE",
  CLAP = "CLAP",
}
export const reactions: {
  reaction: EmotionType;
  id: number;
  emojiId: string;
}[] = [
  {
    id: 0,
    emojiId: "react@emojify-15",
    reaction: EmotionType.BLUSH,
  },
  {
    id: 1,
    emojiId: "react@emojify-16",
    reaction: EmotionType.LOVE,
  },
  {
    id: 2,
    emojiId: "react@emojify-194",
    reaction: EmotionType.LIKE,
  },
  {
    id: 3,
    emojiId: "react@emojify-8",
    reaction: EmotionType.HAHA,
  },
  {
    id: 4,
    emojiId: "react@emojify-785",
    reaction: EmotionType.ICE_CREAM,
  },
  {
    id: 5,
    emojiId: "react@emojify-783",
    reaction: EmotionType.CAKE,
  },
  {
    id: 6,
    emojiId: "react@emojify-200",
    reaction: EmotionType.CLAP,
  },
];

export const ColorThemes = {
  DARK_MAIN: "#2c3639",
  LIGHT_MAIN: "#034c65",
  DARK_BODY: "#3f4e4f",
  LIGHT_BODY: "#f5f5f5",
};
