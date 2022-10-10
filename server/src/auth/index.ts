import jwt from "jsonwebtoken";
import { Response } from "express";
import { __cookieName__ } from "../constants";
import { User } from "../entities/User/User";

export const createAccessToken = (user: User): string => {
  return jwt.sign(
    {
      userId: user._id,
      tokenVersion: user.tokenVersion,
      username: user.username,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRETE!,
    {
      expiresIn: "10m",
    }
  );
};

export const createRefreshToken = (user: User): string => {
  return jwt.sign(
    {
      userId: user._id,
      tokenVersion: user.tokenVersion,
    },
    process.env.REFRESH_TOKEN_SECRETE!,
    {
      expiresIn: "7d",
    }
  );
};

export const storeRefreshToken = (res: Response, token: string): void => {
  // Invalidate old tokens

  res.cookie(__cookieName__, token, {
    httpOnly: true,
  });
};
