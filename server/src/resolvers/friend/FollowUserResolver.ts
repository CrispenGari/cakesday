import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import jwt from "jsonwebtoken";
import { FollowUserObjectType } from "./ObjectTypes/FollowUserObjectType";
import { FollowUserInputType } from "./InputTypes/FollowUserInputType";
import { User } from "../../entities/User/User";
import { ContextType } from "../../types";
import { __cookieName__ } from "../../constants";
import { Follower } from "../../entities/Follower/Follower";
import { Following } from "../../entities/Following/Following";
import { Friend } from "../../entities/Friends/Friends";

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
    if (!!friend.followers.find((f) => f.email === me.email)) {
      // You are following this friend already
      if (!!me.followers.find((f) => f.email === friend.email)) {
        // you are following this and he is following you back
        console.log("you are following this and he is following you back");
        const myFriend = await Friend.create({
          ...friend.profile,
        }).save();
        const hisFriend = await Friend.create({
          ...me.profile,
        }).save();
        friend.friends = [...friend.friends, hisFriend];
        me.friends = [...friend.friends, myFriend];
        await me.save();
        await friend.save();
        return {
          success: true,
          message: {
            field: "friends",
            message: `You are now friends with ${friend.username}.`,
          },
        };
      } else {
        // you are following this user and he is not following you
        console.log("you are following this user and he is not following you");
        return {
          success: true,
          message: {
            field: "follow",
            message: `You already followed ${friend.username}.`,
          },
        };
      }
    } else {
      // you are not following this friend
      const following = await Following.create({
        ...friend.profile,
      }).save();

      me.followings = [...me.followings, following];
      await me.save();

      // Also append yourself to the followers of that user
      const follower = await Follower.create({
        ...me.profile,
      }).save();
      friend.followers = [...friend.followers, follower];
      await friend.save();
      return {
        success: true,
        message: {
          field: "followed",
          message: `You have followed ${friend.username}.`,
        },
      };
    }
  }
}
