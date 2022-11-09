import { User } from "../../entities/User/User";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { ChangePasswordSettingInputType } from "./InputTypes/ChangePasswordSettingsInputType";
import { ChangePasswordSettingsObjectType } from "./ObjectTypes/ChangePasswordSettingsObjectType";
import jwt from "jsonwebtoken";
import { isValidPassword } from "../../utils/regex";
import argon2 from "argon2";
import { storeRefreshToken } from "../../auth";
import { __cookieName__ } from "../../constants";
import { ContextType } from "../../types";
@Resolver()
export class ChangePasswordSettingsResolver {
  @Mutation(() => ChangePasswordSettingsObjectType)
  async changePasswordSettings(
    @Ctx() { res }: ContextType,
    @Arg("input", () => ChangePasswordSettingInputType)
    {
      currentPassword,
      password1,
      password2,
      accessToken,
    }: ChangePasswordSettingInputType
  ): Promise<ChangePasswordSettingsObjectType> {
    let payload: any = null;
    try {
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE);
    } catch (error) {
      return {
        success: false,
        message: {
          field: "accessToken",
          message: "please login again and try to update profile.",
        },
      };
    }
    const user = await User.findOne({
      where: { id: payload.userId },
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
    if (password1 !== password2) {
      return {
        success: false,
        message: {
          field: "newPassword",
          message: "the two password must match.",
        },
      };
    }

    if (!isValidPassword(password1)) {
      return {
        success: false,
        message: {
          field: "newPassword",
          message:
            "password must be at least 8 characters with at least 1 letter and 1 number.",
        },
      };
    }
    const _correct: boolean = await argon2.verify(
      user.password,
      currentPassword
    );
    if (!_correct) {
      return {
        success: false,
        message: {
          field: "currentPassword",
          message: "the current password is incorrect.",
        },
      };
    }

    const correct: boolean = await argon2.verify(user.password, password1);
    if (correct) {
      return {
        success: false,
        message: {
          field: "newPassword",
          message: "you can not use your old password as your new password.",
        },
      };
    }
    const hashedPassword = await argon2.hash(password1);
    user.password = hashedPassword;
    //   logout the user
    user.isLoggedIn = false;
    await user.save();
    storeRefreshToken(res, "");
    res.clearCookie(__cookieName__);
    return {
      success: true,
      message: {
        field: "changePassword",
        message:
          "the password has been changed you are required to log in again.",
      },
    };
  }
}
