import { Arg, Mutation, Resolver } from "type-graphql";
import { UpdateProfileSettingsObjectType } from "./ObjectTypes/UpdateProfileSettingsObjectType";
import { UpdateProfileSettingInputType } from "./InputTypes/UpdateProfileSettingInputType";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User/User";
import { isValidUsername } from "../../utils/regex";

@Resolver()
export class UpdateProfileSettingResolver {
  @Mutation(() => UpdateProfileSettingsObjectType)
  async updateProfileSettings(
    @Arg("input", () => UpdateProfileSettingInputType)
    { accessToken, ...input }: UpdateProfileSettingInputType
  ): Promise<UpdateProfileSettingsObjectType> {
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
      relations: ["profile"],
    });
    if (!user) {
      return {
        success: false,
        message: {
          field: "accessToken",
          message: "please login again and try to update profile.",
        },
      };
    }
    if (input?.username) {
      const { username } = input;
      if (!isValidUsername(username)) {
        return {
          success: false,
          message: {
            field: "username",
            message: `the username '${username}' is invalid.`,
          },
        };
      }
      const __user = await User.findOne({ where: { username } });
      if (__user?.username !== user.username) {
        if (__user) {
          return {
            success: false,
            message: {
              message: "username is already taken.",
              field: "username",
            },
          };
        }
      }
    }

    const _updateUser = await User.findOne({
      where: { id: payload?.userId },
      relations: ["profile"],
    });
    if (!_updateUser) {
      return {
        success: false,
        message: {
          field: "updateUser",
          message: "Failed to update the user for whatever reason. Try again.",
        },
      };
    }
    _updateUser.username = input?.username ?? _updateUser.username;
    _updateUser.profile.username = input?.username ?? _updateUser.username;
    _updateUser.profile.bday = input.bday ?? _updateUser.profile.bday;
    _updateUser.profile.bio = input.bio ?? _updateUser.profile.bio;
    _updateUser.profile.gender = input.gender ?? _updateUser.profile.gender;
    await _updateUser.save();
    return {
      success: true,
      message: {
        message: "profile successfully updated.",
        field: "profileSettings",
      },
    };
  }
}
