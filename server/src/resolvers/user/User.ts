import { ContextType } from "../../types";
import { Ctx, Query, Resolver } from "type-graphql";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User/User";
import { Profile } from "../../entities/Profile/Profile";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Ctx() { req }: ContextType): Promise<User | undefined> {
    const authorization = req.headers["authorization"];
    if (!authorization) return undefined;
    try {
      const token = authorization.split(" ")[1];
      const payload: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE);
      const user = await User.findOne(payload.userId);
      if (!user) return undefined;
      user.profile = (await Profile.findOne({
        where: { username: user.username },
      })) as any;
      return user;
    } catch (error) {
      return undefined;
    }
  }
}
