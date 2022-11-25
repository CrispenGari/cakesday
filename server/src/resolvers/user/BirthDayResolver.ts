import { ContextType, NotificationsType, NotificationType } from "../../types";
import {
  Arg,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
} from "type-graphql";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User/User";
import { dataSource } from "../../db";
import { calculateBelatedBithdays, isUserBirthday } from "../../utils";
import { IgnoredBirthdays } from "../../entities/IgnoredBirthdays/IgnoredBirthdays";
import { UserBirthdayInputType } from "./InputTypes/UserBirthdayInputType";
import { Wished } from "../../entities/Wished/Wished";
import { Notification } from "../../entities/Notification/Notification";

@Resolver()
export class UsersBirthDaysResolver {
  @Query(() => [User], { nullable: true })
  async usersBelatedBirthdays(
    @Ctx() { req }: ContextType
  ): Promise<User[] | undefined> {
    const authorization = req.headers["authorization"];
    if (!authorization) return undefined;
    try {
      const token = authorization.split(" ")[1];
      const payload: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE);
      const user = await dataSource.getRepository(User).findOne({
        where: {
          id: payload.userId,
        },
        relations: {
          followers: true,
          followings: true,
          profile: true,
          settings: {
            common: true,
            notifications: true,
            privacy: true,
          },
          wished: true,
          ignoredBirthdays: true,
        },
      });
      if (!user) {
        return undefined;
      }
      if (user.tokenVersion !== payload.tokenVersion) {
        return undefined;
      }
      const users = await User.find({
        relations: {
          followers: true,
          followings: true,
          profile: true,
          settings: {
            common: true,
            notifications: true,
            privacy: true,
          },
        },
      });
      //   belated birthdays are enabled only for 1 to 5 days
      const _wished = user.wished.map(({ username }) => username);
      const _ignored = user.ignoredBirthdays.map(({ username }) => username);

      return users
        .filter((u) => u.confirmed)
        .filter(
          (u) =>
            calculateBelatedBithdays(u.profile.bday).days >= 1 &&
            calculateBelatedBithdays(u.profile.bday).days <= 5
        )
        .filter((u) => u.id !== user.id)
        .filter((u) => _wished.indexOf(u.username) === -1)
        .filter((u) => _ignored.indexOf(u.username) === -1);
    } catch (error) {
      return undefined;
    }
  }

  @Query(() => [User], { nullable: true })
  async usersBirthday(
    @Ctx() { req }: ContextType
  ): Promise<User[] | undefined> {
    const authorization = req.headers["authorization"];
    if (!authorization) return undefined;
    try {
      const token = authorization.split(" ")[1];
      const payload: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE);
      const user = await dataSource.getRepository(User).findOne({
        where: {
          id: payload.userId,
        },
        relations: {
          followers: true,
          followings: true,
          profile: true,
          settings: {
            common: true,
            notifications: true,
            privacy: true,
          },
          ignoredBirthdays: true,
          wished: true,
        },
      });
      if (!user) {
        return undefined;
      }
      if (user.tokenVersion !== payload.tokenVersion) {
        return undefined;
      }
      const users = await User.find({
        relations: {
          followers: true,
          followings: true,
          profile: true,
          settings: {
            common: true,
            notifications: true,
            privacy: true,
          },
        },
      });

      const _wished = user.wished.map(({ username }) => username);
      const _ignored = user.ignoredBirthdays.map(({ username }) => username);

      // this should expire after 5 days
      return users
        .filter((u) => u.confirmed)
        .filter((u) => isUserBirthday(u.profile.bday))
        .filter((u) => u.id !== user.id)
        .filter((u) => _wished.indexOf(u.username) === -1)
        .filter((u) => _ignored.indexOf(u.username) === -1);
    } catch (error) {
      return undefined;
    }
  }

  @Mutation(() => Boolean)
  async ignoreBirthday(
    @Arg("input", () => UserBirthdayInputType)
    { accessToken, friendUsername }: UserBirthdayInputType
  ): Promise<boolean> {
    let payload: any = null;
    try {
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE);
    } catch (error) {
      return false;
    }
    const me = await User.findOne({
      where: { email: payload.email },
      relations: {
        ignoredBirthdays: true,
        profile: true,
      },
    });
    if (!me) return false;
    const friend = await User.findOne({
      where: { username: friendUsername },
      relations: {
        ignoredBirthdays: true,
        profile: true,
      },
    });
    if (!friend) return false;
    const _ignoredBirthday = await IgnoredBirthdays.create({
      ...friend.profile,
    }).save();
    me.ignoredBirthdays = [...me.ignoredBirthdays, _ignoredBirthday];
    await me.save();
    return true;
  }

  @Mutation(() => Boolean)
  async sendWish(
    @Arg("input", () => UserBirthdayInputType)
    { accessToken, friendUsername, message, bdayCard }: UserBirthdayInputType,
    @PubSub() pubSub: PubSubEngine
  ): Promise<boolean> {
    let payload: any = null;
    try {
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE);
    } catch (error) {
      return false;
    }
    const me = await User.findOne({
      where: { email: payload.email },
      relations: {
        ignoredBirthdays: true,
        profile: true,
        wished: true,
        notifications: true,
      },
    });
    if (!me) return false;
    const friend = await User.findOne({
      where: { username: friendUsername },
      relations: {
        ignoredBirthdays: true,
        profile: true,
        wished: true,
        notifications: true,
      },
    });
    if (!friend) return false;
    const _wished = await Wished.create({
      ...friend.profile,
    }).save();
    me.wished = [...me.wished, _wished];
    // notifications
    const notification = await Notification.create({
      bdayMessage: message,
      message: `${me.username} sent you a birthday card.`,
      type: NotificationType.BIRTHDAY_CARD,
      fromId: me.id,
      fromUsername: me.username,
      fromEmail: me.email,
      fromPhotoURL: me.profile?.photoURL,
      fromBDay: me.profile?.bday,
      fromGender: me.profile?.gender,
      fromBannerURL: me.profile?.bannerURL,
      bdayCard,
    }).save();
    friend.notifications = [...new Set(friend.notifications), notification];
    await dataSource.manager.save(friend);
    await dataSource.manager.save(me);
    await pubSub.publish(NotificationsType.NEW_NOTIFICATION, notification);
    return true;
  }

  @Mutation(() => Boolean)
  async reactToCard(
    @Arg("input", () => UserBirthdayInputType)
    {
      accessToken,
      friendUsername,
      reaction,
      notificationId,
    }: UserBirthdayInputType,
    @PubSub() pubSub: PubSubEngine
  ): Promise<boolean> {
    let payload: any = null;
    try {
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE);
    } catch (error) {
      return false;
    }
    const me = await User.findOne({
      where: { email: payload.email },
      relations: {
        ignoredBirthdays: true,
        profile: true,
        wished: true,
        notifications: true,
      },
    });
    if (!me) return false;
    const friend = await User.findOne({
      where: { username: friendUsername },
      relations: {
        ignoredBirthdays: true,
        profile: true,
        wished: true,
        notifications: true,
      },
    });
    if (!friend) return false;
    const _myNotification = await Notification.findOne({
      where: {
        id: notificationId,
      },
    });
    if (!!!_myNotification) return false;
    _myNotification.reaction = reaction as any;
    await _myNotification.save();
    const notification = await Notification.create({
      message: `${me.username} reacted to their birthday card you sent them.`,
      type: NotificationType.CARD_REACTION,
      fromId: me.id,
      fromUsername: me.username,
      fromEmail: me.email,
      fromPhotoURL: me.profile?.photoURL,
      fromBDay: me.profile?.bday,
      fromGender: me.profile?.gender,
      fromBannerURL: me.profile?.bannerURL,
      reaction: reaction,
      bdayMessage: `${me.username} reacted '${reaction}' to a birthday card you sent them.`,
      bdayCard: _myNotification.bdayCard,
    }).save();
    friend.notifications = [...new Set(friend.notifications), notification];
    await dataSource.manager.save(friend);
    await dataSource.manager.save(me);
    await pubSub.publish(NotificationsType.NEW_NOTIFICATION, notification);
    return true;
  }
}
