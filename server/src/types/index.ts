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
}

export enum NotificationsType {
  NEW_NOTIFICATION = "NEW_NOTIFICATION",
  GET_ALL_NOTIFICATION = "GET_ALL_NOTIFICATION",
}

export interface NewNotificationPayload {
  message: string;
  avatar?: string;
  username: string;
  receivers?: string[];
}
