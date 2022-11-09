import { Arg, Mutation, Resolver } from "type-graphql";
import { IgnoreUserInputType } from "./InputTypes/IgnoreUserInputType";
import { IgnoreUserObjectType } from "./ObjectTypes/IgnoreUserObjectType";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User/User";
import { IgnoredUser } from "../../entities/IngoredUser/IngoredUser";

@Resolver()
export class IgnoreUserResolver {
  @Mutation(() => IgnoreUserObjectType)
  async ignoreUser(
    @Arg("input", () => IgnoreUserInputType)
    { accessToken, friendUsername }: IgnoreUserInputType
  ): Promise<IgnoreUserObjectType> {
    let payload: any = null;
    try {
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE);
    } catch (error) {
      return {
        success: false,
        message: {
          field: "accessToken",
          message: `The access token is invalid.`,
        },
      };
    }

    const me = await User.findOne({
      where: { email: payload.email },
      relations: ["ignoredUsers", "profile"],
    });

    if (!me) {
      return {
        success: false,
        message: {
          field: "user",
          message: `The user does not have a valid account.`,
        },
      };
    }

    const friend = await User.findOne({
      where: { username: friendUsername },
      relations: ["ignoredUsers", "profile"],
    });

    if (!friend) {
      return {
        success: false,
        message: {
          field: "friend",
          message: `The username ${friendUsername} is does not have a CakesDay Account.`,
        },
      };
    }
    const _ignoredUser = await IgnoredUser.create({
      ...friend.profile,
    }).save();
    me.ignoredUsers = [...me.ignoredUsers, _ignoredUser];
    await me.save();
    return {
      success: true,
      message: {
        field: "ignore",
        message: "the user has been ignored",
      },
    };
  }
}
