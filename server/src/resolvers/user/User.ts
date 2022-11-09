import { ContextType } from "../../types";
import { Arg, Ctx, Field, InputType, Int, Query, Resolver } from "type-graphql";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User/User";
import { dataSource } from "../../db";

@InputType()
export class UserInputType {
  @Field(() => Int)
  id: number;
}
@Resolver()
export class UserResolver {
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
      return user;
    } catch (error) {
      return undefined;
    }
  }

  @Query(() => User, { nullable: true })
  async user(
    @Arg("input", () => UserInputType) { id }: UserInputType
  ): Promise<User | undefined> {
    return (
      (await User.findOne({
        where: {
          id,
        },
        relations: [
          "profile",
          "followings",
          "settings",
          "followers",
          "friends",
        ],
      })) ?? undefined
    );
  }
}
