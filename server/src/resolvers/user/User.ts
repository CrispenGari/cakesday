import { ContextType } from "../../types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User/User";
import { dataSource } from "../../db";
@InputType()
export class UserInputType {
  @Field(() => Int)
  id: number;
}
@Resolver(() => User)
export class UserResolver {
  @FieldResolver()
  createdAtFormattedForMoment(@Root() { createdAt }: User): string {
    return createdAt.toString();
  }
  @FieldResolver()
  updatedAtFormattedForMoment(@Root() { updatedAt }: User): string {
    return updatedAt.toString();
  }

  @Query(() => [User], { nullable: true })
  async users(@Ctx() { req }: ContextType): Promise<User[] | undefined> {
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
      return users.filter((u) => u.id !== user.id).filter((u) => u.confirmed);
    } catch (error) {
      return undefined;
    }
  }

  @Query(() => User, { nullable: true })
  // @UseMiddleware(isAuth)
  async me(@Ctx() { req }: ContextType): Promise<User | undefined> {
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
        },
      });
      if (!user) {
        return undefined;
      }
      if (user.tokenVersion !== payload.tokenVersion) {
        return undefined;
      }

      return user;
    } catch (error) {
      return undefined;
    }
  }

  @Query(() => User, { nullable: true })
  async user(
    @Arg("input", () => UserInputType) { id }: UserInputType
  ): Promise<User | undefined> {
    const user =
      (await User.findOne({
        where: {
          id,
        },
        relations: ["profile", "followings", "settings", "followers"],
      })) ?? undefined;

    return user;
  }
}
