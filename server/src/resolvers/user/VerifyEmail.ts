import { ContextType } from "../../types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User/User";
import jwt from "jsonwebtoken";
import {
  __confirm__email__prefix,
  __maxVerificationAge__,
} from "../../constants";
import {
  createAccessToken,
  createRefreshToken,
  storeRefreshToken,
} from "../../auth";

import { VerifyEmailInput } from "./InputTypes/VerifyEmailpInput";
import { VerifyEmailObjectType } from "./ObjectTypes/VerifyEmailObjectType";
import { verificationCodeEmailTemplate } from "../../templates";
import { sendEmail } from "../../utils";
import { generateVerificationCode } from "@crispengari/random-verification-codes/lib";

@Resolver()
export class VerifyEmailResolver {
  @Mutation(() => Boolean)
  async resendVerificationCode(
    @Ctx() { res, redis }: ContextType,
    @Arg("input", () => VerifyEmailInput) { accessToken }: VerifyEmailInput
  ): Promise<boolean> {
    let payload: any = null;
    try {
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE);
    } catch (error) {
      return false;
    }
    const user = await User.findOne(payload.userId);
    if (!user) return false;
    // new token
    const verificationCode: string = (await generateVerificationCode(
      6,
      false,
      true
    )) as string;
    const token: string = __confirm__email__prefix + user.username;
    await redis.setex(token, __maxVerificationAge__, verificationCode);
    await sendEmail(
      user.email,
      verificationCodeEmailTemplate(verificationCode, user),
      "Account Creation Confirmation Code - CakesDay"
    );
    storeRefreshToken(res, createRefreshToken(user));
    return true;
  }

  @Mutation(() => VerifyEmailObjectType)
  async verifyEmail(
    @Ctx() { res, redis }: ContextType,
    @Arg("input", () => VerifyEmailInput)
    { accessToken, verificationCode }: VerifyEmailInput
  ): Promise<VerifyEmailObjectType> {
    let payload: any = null;
    try {
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE);
    } catch (error) {
      return {
        error: {
          field: "accessToken",
          message: "invalid Access Token",
        },
      };
    }

    const user = await User.findOne(payload.userId);
    if (!user) {
      return {
        error: {
          field: "user",
          message: "there's no account corresponding to this user.",
        },
      };
    }

    const _key: string = __confirm__email__prefix + user.username;

    const code = await redis.get(_key);
    if (!code || code !== verificationCode) {
      return {
        error: {
          field: "code",
          message:
            'Invalid verification code. Check if the code has not expired or click "Did not receive the code?".',
        },
      };
    }
    await redis.del(_key);

    //  the user email has been confirmed
    user.confirmed = true;
    // automatically log in the user
    user.isLoggedIn = true;
    await user.save();
    // new tokens
    storeRefreshToken(res, createRefreshToken(user));
    return {
      user,
      accessToken: createAccessToken(user),
    };
  }
}
