import { NonEmptyArray } from "type-graphql";
import { ImAuthenticatedResolver } from "./auth/ImAuthenticatedResolver";
import { FollowUserResolver } from "./friend/FollowUserResolver";
import { FriendsSuggestionsResolver } from "./friend/FriendsSuggestionsResolver";
import { UnFollowUserResolver } from "./friend/UnFollowUserResolver";
import { HelloWorldResolver } from "./hello/HelloWorldResolver";
import { UpdateProfileResolver } from "./profile/UpdateProfile";
import { ChangePasswordResolver } from "./user/ChangePasswordResolver";
import { SignInResolver } from "./user/SignIn";
import { SignOutResolver } from "./user/SignOut";
import { SignUpResolver } from "./user/SignUp";
import { UserResolver } from "./user/User";
import { VerifyEmailResolver } from "./user/VerifyEmail";

export const Resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  HelloWorldResolver,
  ImAuthenticatedResolver,
  SignUpResolver,
  SignOutResolver,
  SignInResolver,
  UserResolver,
  VerifyEmailResolver,
  UpdateProfileResolver,
  ChangePasswordResolver,
  FollowUserResolver,
  FriendsSuggestionsResolver,
  UnFollowUserResolver,
];
