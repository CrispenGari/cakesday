import { ContextType } from "../../types";
import { Ctx, Field, InputType, Int, Query, Resolver } from "type-graphql";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User/User";
import { dataSource } from "../../db";
import { calculateBelatedBithdays, isUserBirthday } from "../../utils";

@InputType()
export class UserInputType {
  @Field(() => Int)
  id: number;
}
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
          friends: true,
          profile: true,
          settings: {
            common: true,
            notifications: true,
            privacy: true,
          },
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
          friends: true,
          profile: true,
          settings: {
            common: true,
            notifications: true,
            privacy: true,
          },
        },
      });
      //   belated birthdays are enabled only for 1 to 5 days
      return users
        .filter((u) => u.confirmed)
        .filter(
          (u) =>
            calculateBelatedBithdays(u.profile.bday).days >= 1 &&
            calculateBelatedBithdays(u.profile.bday).days <= 5
        )
        .filter((u) => u.id !== user.id);
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
          friends: true,
          profile: true,
          settings: {
            common: true,
            notifications: true,
            privacy: true,
          },
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
          friends: true,
          profile: true,
          settings: {
            common: true,
            notifications: true,
            privacy: true,
          },
        },
      });
      return users
        .filter((u) => u.confirmed)
        .filter((u) => isUserBirthday(u.profile.bday))
        .filter((u) => u.id !== user.id);
    } catch (error) {
      return undefined;
    }
  }
}
