import { User } from "../../entities/User/User";
import { ContextType } from "../../types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import argon2 from "argon2";
import {
  __clientURL__,
  __maxResetPasswordLinkAge__,
  __reset__password__link__prefix,
} from "../../constants";
import { SendForgotPasswordEmailInputType } from "./InputTypes/SendForgotPasswordEmailInputType";
import { SendForgotPasswordEmailObjectType } from "./ObjectTypes/SendForgotPasswordEmailObjectType";
import { isValidEmail, isValidPassword } from "../../utils/regex";
import { v4 as uuid_v4 } from "uuid";
import { sendEmail } from "../../utils";
import { ChangePasswordInputType } from "./InputTypes/ChangePasswordInputType";
import { ChangePasswordObjectType } from "./ObjectTypes/ChangePasswordObjectType";
import {
  createAccessToken,
  createRefreshToken,
  storeRefreshToken,
} from "../../auth";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => SendForgotPasswordEmailObjectType, { nullable: false })
  async sendForgotPasswordEmail(
    @Ctx() { redis }: ContextType,
    @Arg("input", () => SendForgotPasswordEmailInputType)
    { email }: SendForgotPasswordEmailInputType
  ): Promise<SendForgotPasswordEmailObjectType> {
    if (!isValidEmail(email.trim().toLowerCase())) {
      return {
        message: {
          field: "email",
          message: `${email.toLowerCase().trim()} is an invalid email address.`,
        },
        success: false,
      };
    }
    const user = await User.findOne({
      where: { email: email.trim().toLowerCase() },
    });
    if (!user) {
      return {
        success: false,
        message: {
          field: "email",

          message: `the email address ${email
            .toLowerCase()
            .trim()} does not have a CakesDay account.`,
        },
      };
    }
    const _key: string = __reset__password__link__prefix + user.username;
    const pwd_token = uuid_v4();

    const emailTemplate = `
    <h1>Hi, ${user.username}</h1>
    <p>We have received an email request at (${user.email}) for account password reset. If you intent to reset your password on your CakesDay account click "RESET PASSWORD" link bellow.</p>
    <h4>
    <a href="${__clientURL__}/auth/new-password?token=${pwd_token}&email=${user.email}">RESET PASSWORD</a>
    </h4>
    <p>Regards</p>
    <p>CakesDay Team</p>
  `;
    await sendEmail(
      email.trim().toLowerCase(),
      emailTemplate,
      "RESET PASSWORD - CakesDay"
    );
    await redis.setex(_key, __maxResetPasswordLinkAge__, pwd_token);
    return {
      message: {
        field: "email",
        message: `the password reset link has been sent to your email address: ${email
          .trim()
          .toLowerCase()}`,
      },
      success: true,
    };
  }

  @Mutation(() => ChangePasswordObjectType, { nullable: false })
  async changePassword(
    @Ctx() { redis, res }: ContextType,
    @Arg("input") { token, email, password }: ChangePasswordInputType
  ): Promise<ChangePasswordObjectType> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return {
        error: {
          field: "username",
          message: "invalid email address.",
        },
      };
    }
    const saved_token_key: string =
      __reset__password__link__prefix + user.username;
    const redis_token = await redis.get(saved_token_key);

    if (redis_token === null) {
      return {
        error: {
          field: "token",
          message: "Invalid token or the reset link has expired.",
        },
      };
    }

    if (redis_token !== token) {
      return {
        error: {
          field: "token",
          message: "invalid token.",
        },
      };
    }
    if (!isValidPassword(password.trim())) {
      return {
        error: {
          field: "password",
          message:
            "password must be at least 8 characters with at least 1 letter and 1 number.",
        },
      };
    }
    const correct: boolean = await argon2.verify(
      user.password,
      password.trim()
    );
    if (correct) {
      return {
        error: {
          field: "password",
          message: "you can not use your old password as your new password.",
        },
      };
    }
    const hashedPassword = await argon2.hash(password);
    await redis.del(saved_token_key);
    user.password = hashedPassword;
    user.isLoggedIn = true;
    await user.save();
    storeRefreshToken(res, createRefreshToken(user));
    return {
      user,
      accessToken: createAccessToken(user),
    };
  }
}
