import { User } from "../../entities/User/User";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import {
  ChangeEmailInputType,
  VerifyNewEmailInputType,
} from "./InputTypes/ChangeEmailInputType";
import { ChangeEmailObjectType } from "./ObjectTypes/ChangeEmailObjectType";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { isValidEmail } from "../../utils/regex";
import { sendEmail } from "../../utils";
import { changeEmailVerificationCodeTemplate } from "../../templates";
import {
  __confirm__email__prefix,
  __maxVerificationAge__,
} from "../../constants";
import { ContextType } from "../../types";
import { generateVerificationCode } from "@crispengari/random-verification-codes/lib";
import { Profile } from "../../entities/Profile/Profile";
import { createRefreshToken, storeRefreshToken } from "../../auth";

@Resolver()
export class ChangeEmailResolver {
  @Mutation(() => ChangeEmailObjectType)
  async changeEmail(
    @Arg("input", () => ChangeEmailInputType)
    { accessToken, currentPassword, email }: ChangeEmailInputType,
    @Ctx() { redis }: ContextType
  ): Promise<ChangeEmailObjectType> {
    let payload: any = null;
    try {
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE);
    } catch (error) {
      return {
        success: false,
        message: {
          field: "accessToken",
          message: "please login again and try to update email.",
        },
      };
    }
    const user = await User.findOne({
      where: { id: payload.userId },
      relations: [
        "profile",
        "followings",
        "settings",
        "followers",
        "friends",
        "ignoredUsers",
        "notifications",
      ],
    });
    if (!user) {
      return {
        success: false,
        message: {
          field: "user",
          message: "could not find the user try login again.",
        },
      };
    }
    const correct = await argon2.verify(user.password, currentPassword);
    if (!correct) {
      return {
        success: false,
        message: {
          field: "password",
          message: "invalid current password for this account.",
        },
      };
    }

    if (!isValidEmail(email)) {
      return {
        success: false,
        message: {
          field: "email",
          message: "invalid email address.",
        },
      };
    }

    if (await User.findOne({ where: { email } })) {
      return {
        success: false,
        message: {
          message: "email address is already in use.",
          field: "email",
        },
      };
    }

    // you will need to verify the email

    const verificationCode: string = (await generateVerificationCode(
      6,
      false,
      true
    )) as string;
    const token: string = __confirm__email__prefix + user.username;

    // here we are not only going to store the code, we will store the a lot of values
    const data = JSON.stringify({
      currentEmail: user.email,
      verificationCode,
      email,
    });
    await redis.setex(token, __maxVerificationAge__, data);
    await sendEmail(
      email,
      changeEmailVerificationCodeTemplate(verificationCode, user, email),
      "Change Email Confirmation Code - CakesDay"
    );
    return {
      success: true,
      message: {
        field: "changeEmail",
        message: `the verification code has been sent to ${email}, please verify your email.`,
      },
    };
  }

  @Mutation(() => ChangeEmailObjectType)
  async verifyNewEmail(
    @Arg("input", () => VerifyNewEmailInputType)
    { accessToken, verificationCode }: VerifyNewEmailInputType,
    @Ctx() { redis, res }: ContextType
  ): Promise<ChangeEmailObjectType> {
    let payload: any = null;
    try {
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE);
    } catch (error) {
      return {
        success: false,
        message: {
          field: "accessToken",
          message: "please login again and try to update email.",
        },
      };
    }
    const user = await User.findOne({
      where: { id: payload.userId },
      relations: [
        "profile",
        "followings",
        "settings",
        "followers",
        "friends",
        "ignoredUsers",
        "notifications",
      ],
    });
    if (!user) {
      return {
        success: false,
        message: {
          field: "user",
          message: "could not find the user try login again.",
        },
      };
    }

    const _key: string = __confirm__email__prefix + user.username;
    const _data = await redis.get(_key);
    if (!_data) {
      return {
        success: false,
        message: {
          field: "token",
          message: "The verification payload has expired for whatever reason.",
        },
      };
    }
    const { currentEmail, verificationCode: code, email } = JSON.parse(_data);

    if (currentEmail !== user.email) {
      return {
        success: false,
        message: {
          field: "email",
          message: "failed to update the email address for whatever reason.",
        },
      };
    }
    if (code !== verificationCode) {
      return {
        success: false,
        message: {
          field: "code",
          message:
            'Invalid verification code. Check if the code has not expired or click "Did not receive the code?".',
        },
      };
    }
    const profile = await Profile.findOne({
      where: {
        username: user.username,
      },
    });
    profile!.email = email;
    await profile!.save();
    user.email = email;
    user.profile = profile!;
    await redis.del(_key);

    //  the user email has been confirmed
    user.confirmed = true;
    await user.save();
    // new tokens
    storeRefreshToken(res, createRefreshToken(user));
    await user.save();
    return {
      success: true,
      message: {
        field: "verifyEmail",
        message: "the email has been successfully changed",
      },
    };
  }
}
