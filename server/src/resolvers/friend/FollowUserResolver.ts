import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import jwt from "jsonwebtoken";
import { FollowUserObjectType } from "./ObjectTypes/FollowUserObjectType";
import { FollowUserInputType } from "./InputTypes/FollowUserInputType";
import { User } from "../../entities/User/User";
import { ContextType } from "../../types";
import { __cookieName__ } from "../../constants";
import { Follower } from "../../entities/Follower/Follower";
import { Following } from "../../entities/Following/Following";
import { dataSource } from "../../db";

@Resolver()
export class FollowUserResolver {
  @Mutation(() => FollowUserObjectType)
  async followUser(
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
      relations: {
        followers: true,
        followings: true,
        profile: true,
      },
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
      relations: {
        followers: true,
        followings: true,
        profile: true,
      },
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

    // followers are people who follows you
    // followings are people you following
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
    const { imFollowing } = followingFollower;
    if (imFollowing) {
      return {
        success: true,
        message: {
          field: "following",
          message: "You are already following this user.",
        },
      };
    }

    const following = await Following.create({
      ...friend.profile,
    }).save();
    me.followings = [...me.followings, following];
    const follower = await Follower.create({
      ...me.profile,
    }).save();

    friend.followers = [...friend.followers, follower];
    await dataSource.manager.save(friend);
    await dataSource.manager.save(me);
    return {
      success: true,
      message: {
        field: "followed",
        message: `You have followed ${friend.username}.`,
      },
    };
  }
}
