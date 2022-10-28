import { User } from "../../entities/User/User";
import { ContextType } from "../../types";
import { Resolver, Mutation, Ctx, Arg } from "type-graphql";
import { FollowUserInputType } from "./InputTypes/FollowUserInputType";
import { FollowUserObjectType } from "./ObjectTypes/FollowUserObjectType";

import jwt from "jsonwebtoken";
import { Follower } from "../../entities/Follower/Follower";
import { Following } from "../../entities/Following/Following";
import { Friend } from "../../entities/Friends/Friends";
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
      relations: ["followers", "followings", "profile", "friends"],
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
      relations: ["followers", "followings", "profile", "friends"],
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
    if (!!!me.followings.find((f) => f.username === friend.username)) {
      return {
        message: {
          message: `You are not following ${friend.username}`,
          field: "unfollow",
        },
        success: true,
      };
    }
    // remove the user from my followings
    // remove myself from his followers
    // remove myself from his friend list
    // remove user from my friend lists.
    me.followings = [...me.followings.filter((f) => f.email !== friend.email)];
    friend.followers = [
      ...friend.followers.filter((f) => f.email !== me.email),
    ];
    me.friends = [...me.friends.filter((f) => f.email !== friend.email)];
    friend.friends = [...friend.friends.filter((f) => f.email !== me.email)];

    // deleting the entities
    const _follower = await Follower.findOne({
      where: {
        id: friend.followers.find((f) => f.email !== me.email)?.id,
      },
    });
    _follower?.remove();

    const _friend0 = await Friend.findOne({
      where: {
        id: friend.followers.find((f) => f.email !== me.email)?.id,
      },
    });
    _friend0?.remove();

    const _following = await Following.findOne({
      where: {
        id: me.followings.find((f) => f.email !== friend.email)?.id,
      },
    });
    _following?.remove();

    const _friend1 = await Friend.findOne({
      where: {
        id: me.followings.find((f) => f.email !== friend.email)?.id,
      },
    });
    _friend1?.remove();

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
}
