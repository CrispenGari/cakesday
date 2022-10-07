import { ContextType } from "../../types";
import { Ctx, Query, Resolver } from "type-graphql";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User/User";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Ctx() { req }: ContextType): Promise<User | undefined> {
    const authorization = req.headers["authorization"];
    if (!authorization) return undefined;
    try {
      const token = authorization.split(" ")[1];
      const payload: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE);
      return (await User.findOne(payload.userId)) as any;
    } catch (error) {
      return undefined;
    }
  }
}
