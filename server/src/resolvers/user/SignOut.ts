import { ContextType } from "../../types";
import { Ctx, Mutation, Resolver } from "type-graphql";
import { storeRefreshToken } from "../../auth";
import { __cookieName__ } from "../../constants";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User/User";

@Resolver()
export class SignOutResolver {
  @Mutation(() => Boolean)
  async signOut(@Ctx() { res, req }: ContextType): Promise<Boolean> {
    /**
     *  Only one device should be allowed to be logged in
     *
     */
    const token = req.cookies[__cookieName__];
    if (!token) return false;
    let payload: any = null;
    try {
      payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRETE);
    } catch (error) {
      return false;
    }
    const user = await User.findOne({ where: { id: payload.userId } });
    if (!user) return false;
    user.isLoggedIn = false;
    await user.save();
    storeRefreshToken(res, "");
    res.clearCookie(__cookieName__);
    return true;
  }
}
