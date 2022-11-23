import { BirthdayCardType, EmojiType } from "../types";

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
];

export const constants = {
  SET_EMAIL_CARD: "SET_EMAIL_CARD",
  SET_NOTIFICATIONS: "SET_NOTIFICATIONS",
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
export const emotions: Array<EmojiType> = [
  {
    name: "grinning",
    code: "0x1F600",
  },
  {
    name: "sweat",
    code: "0x1F605",
  },
  {
    name: "laughing",
    code: "0x1F923",
  },
  {
    name: "joy",
    code: "0x1F602",
  },
  {
    name: "smile",
    code: "0x1F642",
  },
  {
    name: "upside-down",
    code: "0x1F643",
  },
  {
    name: "halo",
    code: "0x1F607",
  },
  {
    name: "star-struck",
    code: "0x1F929",
  },
  {
    name: "hearts",
    code: "0x1F970",
  },
  {
    name: "heart-eyes",
    code: "0x1F60D",
  },
  {
    name: "kiss",
    code: "0x1F618",
  },
];
