import { Profile } from "../../entities/Profile/Profile";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import jwt from "jsonwebtoken";
import { Follower } from "../../entities/Follower/Follower";
import { Following } from "../../entities/Following/Following";
import { FollowUserObjectType } from "./ObjectTypes/FollowUserObjectType";
import { FollowUserInputType } from "./InputTypes/FollowUserInputType";
import { User } from "../../entities/User/User";

@Resolver()
export class FollowUserResolver {
  @Mutation(() => FollowUserObjectType)
  async followUser(
    @Ctx()
    @Arg("input", () => FollowUserInputType)
    { friendUsername, accessToken }: FollowUserInputType
  ): Promise<FollowUserObjectType> {
    const profile = await Profile.findOne({
      where: { username: friendUsername },
    });
    if (!profile) {
      return {
        success: false,
        message: {
          field: "profile",
          message: `The username ${friendUsername} is does not have a CakesDay Account.`,
        },
      };
    }
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
    const user = await User.findOne({
      where: { email: payload.email },
      relations: ["followers", "followings", "profile"],
    });

    if (!user) {
      return {
        success: false,
        message: {
          field: "user",
          message: `The user does not have a valid account.`,
        },
      };
    }

    const isFollowing = !!user.followings.find(
      (f) => f.email === profile.email
    );

    if (isFollowing) {
      return {
        success: true,
        message: {
          field: "following",
          message: `You are already following this user.`,
        },
      };
    }

    const following = await Following.create({
      ...profile,
    }).save();

    user.followings = [...user.followings, following];
    await user.save();

    const _user = await User.findOne({
      where: { username: profile.username },
      relations: ["followers", "followings", "profile"],
    });

    if (!_user) {
      return {
        success: false,
        message: {
          field: "friend",
          message: `The friend account is an invalid one.`,
        },
      };
    }
    const follower = await Follower.create({
      ...user.profile,
    }).save();
    _user.followers = [..._user.followers, follower];
    await _user.save();
    return {
      success: true,
      message: {
        field: "followed",
        message: `You have followed ${_user.username}.`,
      },
    };
  }
}
