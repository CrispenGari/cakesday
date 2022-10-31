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
  NEW_POST = "NEW_POST",
  NEW_LIKE = "NEW_LIKE",
  NEW_COMMENT = "NEW_COMMENT",
  NOTIFY_ON_NEW_POST = "NOTIFY_ON_NEW_POST",
  NOTIFY_ON_MENTIONED = "NOTIFY_ON_MENTIONED",
  NOTIFY_ON_FOLLOWED = "NOTIFY_ON_FOLLOWED",
  NOTIFY_ON_POST_REACTION = "NOTIFY_ON_POST_REACTION",
}

export interface NewNotificationPayload {
  message: string;
  avatar?: string;
  username: string;
  receivers?: string[];
}
