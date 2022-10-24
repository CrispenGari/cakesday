import { Profile } from "../../entities/Profile/Profile";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { AddFriendInputType } from "./InputTypes/AddFriendInputType";
import { AddFriendObjectType } from "./ObjectTypes/AddFriendObjectType";
import { User } from "../../entities/User/User";

@Resolver()
export class AddFriendResolver {
  @Mutation(() => AddFriendObjectType)
  async addFriend(
    @Ctx()
    @Arg("input", () => AddFriendInputType)
    { username }: AddFriendInputType
  ): Promise<AddFriendObjectType> {
    const profile = await Profile.findOne({ where: { username } });
    if (!profile) {
      return {
        success: false,
      };
    }
    // find all the friends

    console.log(profile);
    const friends = await User.findOne({
      where: { username: "username0" },
      relations: ["friends"],
    });
    console.log(friends);
    return {
      success: true,
    };
  }
}
