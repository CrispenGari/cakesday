import { User } from "../../entities/User/User";
import { ContextType } from "../../types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { verify } from "argon2";
import {
  createAccessToken,
  createRefreshToken,
  storeRefreshToken,
} from "../../auth";
import { SignInInput } from "./InputTypes/SignInInput";
import { SignInObjectType } from "./ObjectTypes/SingInObjectType";

@Resolver()
export class SignInResolver {
  @Mutation(() => SignInObjectType)
  async signIn(
    @Arg("input", () => SignInInput)
    { usernameOrEmail, password }: SignInInput,
    @Ctx() { res }: ContextType
  ): Promise<SignInObjectType> {
    const user =
      (await User.findOne({
        where: { email: usernameOrEmail.trim().toLowerCase() },
      })) ??
      (await User.findOne({
        where: { username: usernameOrEmail.trim().toLowerCase() },
      }));

    if (!user)
      if (!user) {
        return {
          error: {
            field: "usernameOrEmail",
            message: "invalid username or email.",
          },
        };
      }
    const valid: boolean = await verify(user.password, password);
    if (!valid) {
      return {
        error: {
          field: "password",
          message: "invalid password.",
        },
      };
    }

    storeRefreshToken(res, createRefreshToken(user));

    return {
      user,
      accessToken: createAccessToken(user),
    };
  }
}
