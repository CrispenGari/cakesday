import {
  Resolver,
  Subscription,
  Root,
  Query,
  Arg,
  Mutation,
} from "type-graphql";
import { Notification } from "../../entities/Notification/Notification";
import { dataSource } from "../../db";
import { User } from "../../entities/User/User";
import jwt from "jsonwebtoken";
import { NotificationsType } from "../../types";
import { MyNotificationInputType } from "./inputTypes/MyNotificationInputType";

@Resolver()
export class MyNotificationResolver {
  @Query(() => [Notification])
  async myNotifications(
    @Arg("input", () => MyNotificationInputType)
    { accessToken }: MyNotificationInputType
  ): Promise<Notification[]> {
    try {
      const payload: any = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRETE
      );
      const user = await dataSource.getRepository(User).findOne({
        where: {
          id: payload.userId,
        },
        relations: {
          profile: true,
          notifications: {
            user: true,
          },
        },
      });

      if (!user) {
        return [];
      }
      if (user.tokenVersion !== payload.tokenVersion) {
        return [];
      }
      return [...new Set(user.notifications)].sort(
        (a: any, b: any) => b.createdAt - a.createdAt
      );
    } catch (error) {
      return [];
    }
  }

  @Subscription(() => Notification, {
    topics: [
      NotificationsType.GET_ALL_NOTIFICATION,
      NotificationsType.NEW_NOTIFICATION,
    ],
    nullable: true,
  })
  async newNotification(
    @Root()
    notification: Notification,
    @Arg("input", () => MyNotificationInputType)
    { accessToken }: MyNotificationInputType
  ): Promise<Notification | undefined> {
    try {
      const payload: any = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRETE
      );
      const user = await dataSource.getRepository(User).findOne({
        where: {
          id: payload.userId,
        },
      });
      if (!user) {
        return undefined;
      }
      if (user.tokenVersion !== payload.tokenVersion) {
        return undefined;
      }

      const noti = await dataSource
        .getRepository(Notification)
        .createQueryBuilder("notification")
        .where("notification.id = :id", { id: notification.id })
        .leftJoinAndSelect("notification.user", "user")
        .getOne();

      return noti ?? undefined;
    } catch (error) {
      return undefined;
    }
  }

  @Mutation(() => Boolean)
  async markAsRead(
    @Arg("input", () => MyNotificationInputType)
    { accessToken, notificationId }: MyNotificationInputType
  ): Promise<boolean> {
    try {
      const payload: any = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRETE
      );
      const user = await dataSource.getRepository(User).findOne({
        where: {
          id: payload.userId,
        },
        relations: {
          profile: true,
          notifications: {
            user: true,
          },
        },
      });

      if (!user) {
        return false;
      }
      if (user.tokenVersion !== payload.tokenVersion) {
        return false;
      }
      if (!notificationId) return false;
      const notification = await Notification.findOne({
        where: {
          id: notificationId,
        },
      });
      notification!.read = true;
      await notification!.save();
    } catch (error) {
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async deleteNotification(
    @Arg("input", () => MyNotificationInputType)
    { accessToken, notificationId }: MyNotificationInputType
  ): Promise<boolean> {
    try {
      const payload: any = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRETE
      );
      const user = await dataSource.getRepository(User).findOne({
        where: {
          id: payload.userId,
        },
        relations: {
          profile: true,
          notifications: {
            user: true,
          },
        },
      });

      if (!user) {
        return false;
      }
      if (user.tokenVersion !== payload.tokenVersion) {
        return false;
      }
      if (!notificationId) return false;
      const notification = await Notification.findOne({
        where: {
          id: notificationId,
        },
      });
      notification!?.remove();
      await notification!.save();
    } catch (error) {
      return false;
    }
    return true;
  }
}
