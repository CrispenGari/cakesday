import { User } from "../../entities/User/User";
import { Resolver, Mutation, Arg } from "type-graphql";
import { UpdateCommonSettingsInputType } from "./InputTypes/UpdateCommonSettingsInputType";
import jwt from "jsonwebtoken";
import { CommonSettings } from "../../entities/Settings/Common/Common";
import { UpdateCommonSettingsObjectType } from "./ObjectTypes/UpdateCommonSettingsObjectType";

@Resolver()
export class UpdateCommonSettingsResolver {
  @Mutation(() => UpdateCommonSettingsObjectType)
  async updateCommonSettings(
    @Arg("input", () => UpdateCommonSettingsInputType)
    { accessToken, ...input }: UpdateCommonSettingsInputType
  ): Promise<UpdateCommonSettingsObjectType> {
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

    const commonSettings = await CommonSettings.findOne({
      where: {
        id: user.settings.common.id,
      },
    });

    commonSettings!.emailSubscriptions =
      input.emailSubscriptions ?? commonSettings!.emailSubscriptions;
    commonSettings!.theme = input.theme ?? commonSettings!.theme;
    await commonSettings!.save();
    return {
      success: true,
      message: {
        field: "updateCommonSettings",
        message: "settings updated successfully.",
      },
    };
  }
}
