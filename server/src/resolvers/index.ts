import { NonEmptyArray } from "type-graphql";
import { ImAuthenticatedResolver } from "./auth/ImAuthenticatedResolver";
import { InvalidateTokenResolver } from "./auth/InValidateTokenResolver";
import { FollowUserResolver } from "./friend/FollowUserResolver";
import { FriendsSuggestionsResolver } from "./friend/FriendsSuggestionsResolver";
import { UnFollowUserResolver } from "./friend/UnFollowUserResolver";
import { HelloWorldResolver } from "./hello/HelloWorldResolver";
import { UpdateProfileResolver } from "./profile/UpdateProfile";
import { ChangeNotificationSettingsResolver } from "./settings/ChangeNotificationSettingsResolver";
import { ChangePasswordSettingsResolver } from "./settings/ChangePasswordSettingsResolver";
import { ChangePrivacySettingsResolver } from "./settings/ChangePrivacySettingsResolver";
import { UpdateCommonSettingsResolver } from "./settings/UpdateCommonSettingsResolver";
import { UpdateProfileSettingResolver } from "./settings/UpdateProfileSettingsResolver";

import { ChangePasswordResolver } from "./user/ChangePasswordResolver";
import { SignInResolver } from "./user/SignIn";
import { SignOutResolver } from "./user/SignOut";
import { SignUpResolver } from "./user/SignUp";
import { UserResolver } from "./user/User";
import { VerifyEmailResolver } from "./user/VerifyEmail";
import { IgnoreUserResolver } from "./friend/IgnoreUserResolver";
import { ChangeEmailResolver } from "./user/ChangeEmailResolver";
import { DeleteAccountResolver } from "./user/DeleteAccountResolver";
import { UsersBirthDaysResolver } from "./user/BirthDayResolver";

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
  InvalidateTokenResolver,
  UpdateProfileSettingResolver,
  ChangePasswordSettingsResolver,
  UpdateCommonSettingsResolver,
  ChangeNotificationSettingsResolver,
  ChangePrivacySettingsResolver,
  IgnoreUserResolver,
  ChangeEmailResolver,
  DeleteAccountResolver,
  UsersBirthDaysResolver,
];
