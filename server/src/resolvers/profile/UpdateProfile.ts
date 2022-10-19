import { User } from "../../entities/User/User";
import { ContextType } from "../../types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import {
  createAccessToken,
  createRefreshToken,
  storeRefreshToken,
} from "../../auth";
import { UpdateProfileObjectType } from "./ObjectTypes/UpdateProfileObjectType";
import { ProfileInput } from "./InputTypes/UpdateProfileInput";
import jwt from "jsonwebtoken";
import { Profile } from "../../entities/Profile/Profile";
import { getDownloadURL } from "../../utils";

@Resolver()
export class UpdateProfileResolver {
  @Mutation(() => UpdateProfileObjectType)
  async updateAvatarOrBanner(
    @Arg("input", () => ProfileInput)
    { banner, avatar, accessToken }: ProfileInput,
    @Ctx() { res }: ContextType
  ): Promise<UpdateProfileObjectType> {
    let payload: any = null;
    try {
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE);
    } catch (error) {
      return {
        error: {
          field: "accessToken",
          message: "invalid Access Token",
        },
      };
    }
    const user = await User.findOne({
      where: { email: payload.email },
      relations: ["profile"],
    });
    console.log("User.....", user);
    if (!user) {
      return {
        error: {
          field: "user",
          message: "there's no account corresponding to this user.",
        },
      };
    }
    const profile = await Profile.findOne({
      where: {
        username: user.username,
      },
    });

    if (banner) {
      const uploadURL = await getDownloadURL(banner, user);
      if (!profile) {
        // create a new profile
        const _profile = new Profile();
        _profile.photoURL = uploadURL ?? user.profile.photoURL;
        const __profile = await _profile.save();
        user.profile = __profile;
      } else {
        // update existing profile
        profile.photoURL = uploadURL ?? user.profile.photoURL;
        const _profile = await profile.save();
        user.profile = _profile;
      }
    }
    if (avatar) {
      const uploadURL = await getDownloadURL(avatar, user);
      if (!profile) {
        // create a new profile
        const _profile = new Profile();
        _profile.bannerURL = uploadURL ?? user.profile.bannerURL;
        const __profile = await _profile.save();
        user.profile = __profile;
      } else {
        // update existing profile
        profile.bannerURL = uploadURL ?? user.profile.bannerURL;
        const _profile = await profile.save();
        user.profile = _profile;
      }
    }

    await user.save();
    storeRefreshToken(res, createRefreshToken(user));
    return {
      user,
      accessToken: createAccessToken(user),
    };
  }

  @Mutation(() => UpdateProfileObjectType)
  async updateProfile(
    @Arg("input", () => ProfileInput)
    input: ProfileInput,
    @Ctx() { res }: ContextType
  ): Promise<UpdateProfileObjectType> {
    let payload: any = null;
    try {
      payload = jwt.verify(input.accessToken, process.env.ACCESS_TOKEN_SECRETE);
    } catch (error) {
      return {
        error: {
          field: "accessToken",
          message: "invalid Access Token",
        },
      };
    }
    const user = await User.findOne({
      where: { email: payload.email },
      relations: ["profile"],
    });
    if (!user) {
      return {
        error: {
          field: "user",
          message: "there's no account corresponding to this user.",
        },
      };
    }
    /**
     *
     * UPDATE THE PROFILE WITH THE NEW VALUES
     */

    const profile = await Profile.findOne({
      where: {
        username: user.username,
      },
    });

    if (!profile) {
      // create a new profile
      const _profile = new Profile();
      _profile.email = input?.email ?? user.email;
      _profile.username = input?.username ?? user.username;
      _profile.bannerURL = user.profile?.bannerURL;
      _profile.bday = input?.bday ?? user.profile?.bday;
      _profile.bio = input?.bio ?? user.profile?.bio;
      _profile.gender = input?.gender ?? user.profile?.gender;
      _profile.photoURL = user.profile?.photoURL;
      _profile.verified = input?.verified ?? user.profile?.verified;
      const __profile = await _profile.save();
      user.profile = __profile;
    } else {
      // update existing profile
      profile.email = input?.email ?? user.email;
      profile.username = input?.username ?? user.username;
      profile.bannerURL = user.profile?.bannerURL;
      profile.bday = input?.bday ?? user.profile?.bday;
      profile.bio = input?.bio ?? user.profile?.bio;
      profile.gender = input?.gender ?? user.profile?.gender;
      profile.photoURL = user.profile?.photoURL;
      profile.verified = input?.verified ?? user.profile?.verified;
      const _profile = await profile.save();
      user.profile = _profile;
    }

    await user.save();
    storeRefreshToken(res, createRefreshToken(user));
    return {
      user,
      accessToken: createAccessToken(user),
    };
  }
}
