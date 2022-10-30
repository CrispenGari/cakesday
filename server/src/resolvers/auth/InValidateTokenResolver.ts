import { User } from "../../entities/User/User";
import { Arg, Mutation, Resolver, Ctx } from "type-graphql";
import { InvalidateTokenInputType } from "./InputTypes/InvalidateTokenInputType";

import jwt from "jsonwebtoken";
import { dataSource } from "../../db";
import { storeRefreshToken } from "../../auth";
import { ContextType } from "../../types";
import { InvalidateTokenObjectType } from "./ObjectTypes/InvalidateTokenObjectType";
import { verify } from "argon2";
import { __cookieName__ } from "../../constants";

@Resolver()
export class InvalidateTokenResolver {
  @Mutation(() => InvalidateTokenObjectType)
  async invalidateToken(
    @Ctx() { res }: ContextType,
    @Arg("input", () => InvalidateTokenInputType)
    { accessToken, currentPassword }: InvalidateTokenInputType
  ): Promise<InvalidateTokenObjectType> {
    let payload: any = null;
    try {
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE);
    } catch (error) {
      return {
        success: false,
        message: {
          field: "accessToken",
          message: "please login again and try to invalidate tokens.",
        },
      };
    }
    const user = await User.findOne({ where: { id: payload.userId } });

    if (!user) {
      return {
        success: false,
        message: {
          field: "user",
          message: "please login again and try to invalidate tokens.",
        },
      };
    }
    const valid = await verify(user.password, currentPassword);
    if (!valid) {
      return {
        success: false,
        message: {
          field: "password",
          message: "invalid account password.",
        },
      };
    }
    await dataSource.getRepository(User).increment(
      {
        id: payload.userId,
      },
      "tokenVersion",
      1
    );
    storeRefreshToken(res, "");
    res.clearCookie(__cookieName__);
    return {
      success: true,
      message: {
        field: "invalidate",
        message:
          "tokens was successfully invalidated singing in again is required.",
      },
    };
  }
}
