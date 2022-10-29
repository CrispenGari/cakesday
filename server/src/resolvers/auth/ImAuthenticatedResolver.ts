import { Mutation, Resolver, Arg } from "type-graphql";
import { ImAuthenticatedObjectType } from "./ObjectTypes/ImAuthenticatedObjectType";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User/User";
import { ImAuthenticatedInputType } from "./InputTypes/ImAuthenticatedInputType";

@Resolver()
export class ImAuthenticatedResolver {
  @Mutation(() => ImAuthenticatedObjectType)
  async imAuthenticated(
    @Arg("input", () => ImAuthenticatedInputType)
    { refreshToken }: ImAuthenticatedInputType
  ): Promise<ImAuthenticatedObjectType> {
    if (!refreshToken)
      return {
        imAuthenticated: false,
        error: {
          field: "refreshToken",
          message: "Invalid refresh token.",
        },
      };

    try {
      const payload: any = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRETE
      );
      const user = await User.findOne({
        where: { id: payload.userId as number },
      });

      if (!user) {
        return {
          imAuthenticated: false,
          error: {
            message: "could not find the user",
            field: "user",
          },
        };
      }
      if (user.isLoggedIn === false || user.confirmed === false) {
        return {
          imAuthenticated: false,
          error: {
            message: "user email not confirmed or user is not authenticated",
            field: "confirmed",
          },
        };
      }
    } catch {
      return {
        imAuthenticated: false,
        error: {
          message: "invalid refresh token",
          field: "refreshToken",
        },
      };
    }

    return {
      imAuthenticated: true,
      error: {
        message: "you are authenticated",
        field: "user",
      },
    };
  }
}
