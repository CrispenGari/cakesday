import { Arg, Mutation, Resolver } from "type-graphql";
import { DeleteAccountInputType } from "./InputTypes/DeleteAccountInputType";
import { DeleteAccountObjectType } from "./ObjectTypes/DeleteAccountObjectTyps";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { User } from "../../entities/User/User";
import { notifyUserThatTheAccountHasBeenDeleted } from "../../templates";
import { deleteFileFromStorage, sendEmail } from "../../utils";
import { Follower } from "../../entities/Follower/Follower";
import { dataSource } from "../../db";
import { Following } from "../../entities/Following/Following";
import { Profile } from "../../entities/Profile/Profile";
import { Settings } from "../../entities/Settings/Settings";
import { IgnoredUser } from "../../entities/IngoredUser/IngoredUser";
// import { Notification } from "../../entities/Notification/Notification";

@Resolver()
export class DeleteAccountResolver {
  @Mutation(() => DeleteAccountObjectType)
  async deleteAccount(
    @Arg("input", () => DeleteAccountInputType)
    { accessToken, currentPassword }: DeleteAccountInputType
  ): Promise<DeleteAccountObjectType> {
    let payload: any = null;
    try {
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE);
    } catch (error) {
      return {
        success: false,
        message: {
          field: "accessToken",
          message: "please login again and if you want to delete account.",
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
    //  notify the user about their deleted account
    await sendEmail(
      user.email,
      notifyUserThatTheAccountHasBeenDeleted(user),
      "Account Deletion - CakesDay"
    );

    // delete stuff from storage
    const banner = user.profile.bannerURL;
    const avatar = user.profile.photoURL;
    if (!!banner) {
      await deleteFileFromStorage(banner);
    }
    if (!!avatar) {
      await deleteFileFromStorage(avatar);
    }
    // delete the user
    await dataSource
      .createQueryBuilder()
      .delete()
      .from(Follower)
      .where("userId = :userId", { userId: user.id })
      .execute();
    await dataSource
      .createQueryBuilder()
      .delete()
      .from(Following)
      .where("userId = :userId", { userId: user.id })
      .execute();
    // await dataSource
    //   .createQueryBuilder()
    //   .delete()
    //   .from(Notification)
    //   .where("email = :email", { email: user.email })
    //   .execute();

    await dataSource
      .createQueryBuilder()
      .delete()
      .from(IgnoredUser)
      .where("userId = :userId", { userId: user.id })
      .execute();

    await dataSource
      .createQueryBuilder()
      .delete()
      .from(Settings)
      .where("id = :id", { id: user.settings.id })
      .execute();

    await dataSource
      .createQueryBuilder()
      .delete()
      .from(Profile)
      .where("id = :id", { id: user.profile.id })
      .execute();

    await user.remove();
    return {
      success: true,
      message: {
        message: "account has been deleted",
        field: "deleteAccount",
      },
    };
  }
}
