import { MiddlewareFn, NextFn } from "type-graphql";
import jwt from "jsonwebtoken";
import { ContextType } from "../types";

export const isAuth: MiddlewareFn<ContextType> = async (
  { context: { req } },
  next: NextFn
): Promise<any> => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    throw new Error("There's no authorization header please try login again.");
  }
  try {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE);
  } catch (error) {
    throw new Error("Invalid access token.");
  }
  return next();
};
