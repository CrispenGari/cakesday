import { ContextType } from "../../types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { SignUpInput } from "./InputTypes/SignUpInput";
import { SignUpObjectType } from "./ObjectTypes/SignUpObjectType";
import argorn2 from "argon2";

import { User } from "../../entities/User/User";

import {
  __confirm__email__prefix,
  __maxVerificationAge__,
} from "../../constants";
import {
  createAccessToken,
  createRefreshToken,
  storeRefreshToken,
} from "../../auth";
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../../utils/regex";
import { sendEmail } from "../../utils";
import { verificationCodeEmailTemplate } from "../../templates";
import { generateVerificationCode } from "@crispengari/random-verification-codes/lib";
import { Profile } from "../../entities/Profile/Profile";
import { CommonSettings } from "../../entities/Settings/Common/Common";
import { NotificationsSettings } from "../../entities/Settings/Notifications/Notification";
import { PrivacySettings } from "../../entities/Settings/Privacy/Privacy";
import { Settings } from "../../entities/Settings/Settings";

@Resolver()
export class SignUpResolver {
  @Mutation(() => SignUpObjectType)
  async signUp(
    @Ctx() { res, redis }: ContextType,
    @Arg("input", () => SignUpInput)
    { email, password, username }: SignUpInput
  ): Promise<SignUpObjectType> {
    username = username.trim().toLocaleLowerCase();
    email = email.trim().toLocaleLowerCase();
    if (!isValidUsername(username)) {
      return {
        error: {
          field: "username",
          message: "invalid username.",
        },
      };
    }
    if (!isValidEmail(email)) {
      return {
        error: {
          field: "email",
          message: "invalid email address.",
        },
      };
    }
    if (!isValidPassword(password)) {
      return {
        error: {
          field: "password",
          message:
            "password must be at least 8 characters with at least 1 letter and 1 number.",
        },
      };
    }
    if (await User.findOne({ where: { username } })) {
      return {
        error: {
          message: "username is already taken.",
          field: "username",
        },
      };
    }
    if (await User.findOne({ where: { email } })) {
      return {
        error: {
          message: "email address is already in use.",
          field: "email",
        },
      };
    }
    const hashedPassword = await argorn2.hash(password);
    // Create a temporary profile
    const profile = await Profile.create({
      username,
      email,
    }).save();

    const user = await User.create({
      password: hashedPassword,
      username,
      email,
    }).save();

    // Default user settings by cakesday
    const _commonSetting = await CommonSettings.create().save();
    const _notificationSetting = await NotificationsSettings.create().save();
    const _privacySettings = await PrivacySettings.create().save();

    const userSettings = await Settings.create({
      common: _commonSetting,
      notifications: _notificationSetting,
      privacy: _privacySettings,
    }).save();

    user.settings = userSettings;
    user.profile = profile;
    await user.save();
    // send the verification email
    const verificationCode: string = (await generateVerificationCode(
      6,
      false,
      true
    )) as string;
    const token: string = __confirm__email__prefix + username;
    await redis.setex(token, __maxVerificationAge__, verificationCode);
    await sendEmail(
      email,
      verificationCodeEmailTemplate(verificationCode, user),
      "Account Creation Confirmation Code - CakesDay"
    );
    storeRefreshToken(res, createRefreshToken(user));
    return {
      user,
      accessToken: createAccessToken(user),
    };
  }
}
