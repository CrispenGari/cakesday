import { User } from "../../entities/User/User";
import { ContextType } from "../../types";
import { Resolver, Mutation, Ctx, Arg } from "type-graphql";
import { FollowUserInputType } from "./InputTypes/FollowUserInputType";
import { FollowUserObjectType } from "./ObjectTypes/FollowUserObjectType";

import jwt from "jsonwebtoken";
@Resolver()
export class UnFollowUserResolver {
  @Mutation(() => FollowUserObjectType)
  async unFollowUser(
    @Ctx() {}: ContextType,
    @Arg("input", () => FollowUserInputType)
    { friendUsername, accessToken }: FollowUserInputType
  ): Promise<FollowUserObjectType> {
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
    // Find your account
    const me = await User.findOne({
      where: { email: payload.email },
      relations: ["followers", "followings", "profile"],
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
    // Find Friend account
    const friend = await User.findOne({
      where: { username: friendUsername },
      relations: ["followers", "followings", "profile"],
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

    // followers are people who follow you but not follow them back
    // followings are  people you follows but they don't follow you back

    let followingFollower = {
      imFollowing: false,
      heIsFollowing: false,
    };
    if (!!me.followings.find((f) => f.email === friend.email)) {
      followingFollower = {
        ...followingFollower,
        imFollowing: true,
      };
    }
    if (!!me.followers.find((f) => f.email === friend.email)) {
      followingFollower = {
        ...followingFollower,
        heIsFollowing: true,
      };
    }

    const { imFollowing, heIsFollowing } = followingFollower;

    if (imFollowing) {
      me.followings = me.followings.filter(
        (f) => f.username !== friend.username
      );
      friend.followers = friend.followers.filter(
        (f) => f.username !== me.username
      );
      await me.save();
      await friend.save();
      return {
        success: true,
        message: {
          field: "unfollow",
          message: `You have unfollowed ${friend.username}.`,
        },
      };
    }
    if (!imFollowing && heIsFollowing) {
      return {
        success: true,
        message: {
          field: "following",
          message: "You are not following the user.",
        },
      };
    }

    return {
      success: false,
      message: {
        field: "unfollow",
        message: `Failed.`,
      },
    };
  }
}
