import { PrivacySettings } from "../../entities/Settings/Privacy/Privacy";
import { User } from "../../entities/User/User";
import { Resolver, Arg, Mutation } from "type-graphql";
import { ChangePrivacySettingsObjectType } from "./ObjectTypes/ChangePrivacySettingsObjectType";
import jwt from "jsonwebtoken";
import { ChangePrivacySettingsInputType } from "./InputTypes/ChangePrivacySettingsInputType";

@Resolver()
export class ChangePrivacySettingsResolver {
  @Mutation(() => ChangePrivacySettingsObjectType)
  async updatePrivacySettings(
    @Arg("input", () => ChangePrivacySettingsInputType)
    { accessToken, ...input }: ChangePrivacySettingsInputType
  ): Promise<ChangePrivacySettingsObjectType> {
    let payload: any = null;
    try {
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE);
    } catch (error) {
      return {
        success: false,
        message: {
          field: "accessToken",
          message: "please login again and try to update settings.",
        },
      };
    }
    const user = await User.findOne({
      where: { id: payload.userId },
      relations: {
        settings: {
          common: true,
          notifications: true,
          privacy: true,
        },
      },
    });
    if (!user) {
      return {
        success: false,
        message: {
          field: "accessToken",
          message: "please login again and try to update settings.",
        },
      };
    }

    const privacy = await PrivacySettings.findOne({
      where: {
        id: user.settings.common.id,
      },
    });

    privacy!.myBirthday = input.myBirthday ?? privacy!.myBirthday;
    privacy!.sendBirthDayWishes =
      input.sendBirthDayWishes ?? privacy!.sendBirthDayWishes;
    privacy!.myProfile = input.myProfile ?? privacy!.myProfile;
    privacy!.followersFollowings =
      input.followersFollowings ?? privacy!.followersFollowings;
    privacy!.shareBirthDayCard =
      input.shareBirthDayCard ?? privacy!.shareBirthDayCard;

    await privacy!.save();
    return {
      success: true,
      message: {
        field: "updateNotificationSettings",
        message: "settings updated successfully.",
      },
    };
  }
}
