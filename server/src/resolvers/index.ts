import { NonEmptyArray } from "type-graphql";
import { CookieResolver } from "./auth/CookieResolver";
import { HelloWorldResolver } from "./hello/HelloWorldResolver";
import { SignInResolver } from "./user/SignIn";
import { SignOutResolver } from "./user/SignOut";
import { SignUpResolver } from "./user/SignUp";
import { UserResolver } from "./user/User";
import { VerifyEmailResolver } from "./user/VerifyEmail";

export const Resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  HelloWorldResolver,
  CookieResolver,
  SignUpResolver,
  SignOutResolver,
  SignInResolver,
  UserResolver,
  VerifyEmailResolver,
];
