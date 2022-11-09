import { User } from "../../entities/User/User";
import { Arg, Mutation, Resolver } from "type-graphql";
import { ChangeNotificationSettingsInputType } from "./InputTypes/ChangeNotificationSettingsInputType";
import { ChangeNotificationSettingsObjectType } from "./ObjectTypes/ChangeNotificationSettingsObjectType";

import jwt from "jsonwebtoken";
import { NotificationsSettings } from "../../entities/Settings/Notifications/Notification";
@Resolver()
export class ChangeNotificationSettingsResolver {
  @Mutation(() => ChangeNotificationSettingsObjectType)
  async updateNotificationSettings(
    @Arg("input", () => ChangeNotificationSettingsInputType)
    { accessToken, ...input }: ChangeNotificationSettingsInputType
  ): Promise<ChangeNotificationSettingsObjectType> {
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

    const notificationsSettings = await NotificationsSettings.findOne({
      where: {
        id: user.settings.common.id,
      },
    });

    notificationsSettings!.onBirthDayWish =
      input.onBirthDayWish ?? notificationsSettings!.onBirthDayWish;
    notificationsSettings!.onFriendBirthday =
      input.onFriendBirthday ?? notificationsSettings!.onFriendBirthday;
    notificationsSettings!.onFriendProfileUpdate =
      input.onFriendProfileUpdate ??
      notificationsSettings!.onFriendProfileUpdate;
    notificationsSettings!.onNewUserAccountCreation =
      input.onNewUserAccountCreation ??
      notificationsSettings!.onNewUserAccountCreation;
    notificationsSettings!.onNewFollowers =
      input.onNewFollowers ?? notificationsSettings!.onNewFollowers;
    notificationsSettings!.onNewFriends =
      input.onNewFriends ?? notificationsSettings!.onNewFriends;

    await notificationsSettings!.save();
    return {
      success: true,
      message: {
        field: "updateNotificationSettings",
        message: "settings updated successfully.",
      },
    };
  }
}
