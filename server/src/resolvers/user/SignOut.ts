import { ContextType } from "../../types";
import { Ctx, Mutation, Resolver } from "type-graphql";
import { storeRefreshToken } from "../../auth";
import { __cookieName__ } from "../../constants";

@Resolver()
export class SignOutResolver {
  @Mutation(() => Boolean)
  async signOut(@Ctx() { res }: ContextType): Promise<Boolean> {
    /**
     *  Only one device should be allowed to be logged in
     *
     */
    storeRefreshToken(res, "");
    res.clearCookie(__cookieName__);
    return true;
  }
}
