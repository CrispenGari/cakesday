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

@Resolver()
export class SignUpResolver {
  @Mutation(() => SignUpObjectType)
  async signUp(
    @Ctx() { res }: ContextType,
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
    const user = await User.create({
      password: hashedPassword,
      username,
      email,
    }).save();

    storeRefreshToken(res, createRefreshToken(user));
    return {
      user,
      accessToken: createAccessToken(user),
    };
  }
}
