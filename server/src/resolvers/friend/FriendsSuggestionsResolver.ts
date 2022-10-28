import { User } from "../../entities/User/User";
import { Arg, Query, Resolver } from "type-graphql";
import { FriendSuggestionInputType } from "./InputTypes/FriendsSuggestionsInputType";
import { FriendSuggestionObjectType } from "./ObjectTypes/FriendsSuggestionsObjectType";
import jwt from "jsonwebtoken";

@Resolver()
export class FriendsSuggestionsResolver {
  @Query(() => FriendSuggestionObjectType)
  async suggestions(
    @Arg("input", () => FriendSuggestionInputType)
    { accessToken }: FriendSuggestionInputType
  ): Promise<FriendSuggestionObjectType> {
    let payload: any = null;
    try {
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE);
    } catch (error) {
      return {
        suggestions: [],
        error: {
          field: "accessToken",
          message: `The access token is invalid.`,
        },
      };
    }
    const user = await User.findOne({
      where: { email: payload.email },
      relations: ["followers", "followings", "profile", "friends"],
    });

    if (!user) {
      return {
        suggestions: [],
        error: {
          message: "The user is not available.",
          field: "user",
        },
      };
    }

    const followings = user.followings.map((f) => f.username);
    console.log(followings);
    const suggestions = await User.find({
      relations: ["profile", "followers", "followings", "friends"],
    });

    const _suggestions = suggestions
      .filter((s) => followings.indexOf(s.username) === -1)
      .filter((s) => s.profile)
      .filter((s) => s.username !== user.username)
      .filter((s) => s.confirmed);

    return {
      suggestions: _suggestions,
    };
  }
}
