import express from "express";
import Redis from "ioredis";
export interface ContextType {
  req: express.Request;
  res: express.Response;
  redis: Redis;
}

export enum ThemeType {
  DARK = "dark",
  LIGHT = "light",
}
export enum PrivacyType {
  ONLY_ME = "only me",
  EVERYONE = "everyone",
  FOLLOWERS = "followers",
  FRIENDS = "friends",
}
export enum GenderType {
  FEMALE = "female",
  MALE = "male",
  TRANSGENDER = "transgender",
}

export enum NotificationType {
  NEW_FOLLOWER = "new_follower",
  NEW_FRIEND = "new_friend",
  BIRTHDAY_CARD = "birthday_card",
  CARD_REACTION = "birthday_card_reaction",
}

export enum NotificationsType {
  NEW_NOTIFICATION = "NEW_NOTIFICATION",
  GET_ALL_NOTIFICATION = "GET_ALL_NOTIFICATION",
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

export enum EmotionType {
  LOVE = "LOVE",
  LIKE = "LIKE",
  BLUSH = "BLUSH",
  HAHA = "HAHA",
  ICE_CREAM = "ICE_CREAM",
  CAKE = "CAKE",
  CLAP = "CLAP",
}

export enum UserMoodType {
  LOVELY = "",
}
export interface NewNotificationPayload {
  message: string;
  avatar?: string;
  username: string;
  receivers?: string[];
}
