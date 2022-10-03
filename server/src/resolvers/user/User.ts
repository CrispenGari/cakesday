import { ContextType } from "../../types";
import { Ctx, Query, Resolver } from "type-graphql";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User/User";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Ctx() { req }: ContextType): Promise<User | undefined> {
    const authorization = req.headers["authorization"];
    console.log(authorization);
    if (!authorization) return undefined;
    try {
      const token = String(authorization).includes("Bearer")
        ? authorization.split(" ")[1]
        : authorization;
      const payload: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE);
      return (await User.findOne({
        where: {
          _id: payload.userId,
        },
      })) as any;
    } catch (error) {
      return undefined;
    }
  }
}
