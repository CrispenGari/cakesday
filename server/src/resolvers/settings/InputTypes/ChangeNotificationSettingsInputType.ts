import { InputType, Field } from "type-graphql";

@InputType()
export class ChangeNotificationSettingsInputType {
  @Field(() => String)
  accessToken: string;

  @Field(() => Boolean, { nullable: true })
  onNewUserAccountCreation?: false | true;

  @Field(() => Boolean, { nullable: true })
  onNewFollowers?: false | true;

  @Field(() => Boolean, { nullable: true })
  onNewFriends?: false | true;

  @Field(() => Boolean, { nullable: true })
  onFriendProfileUpdate?: false | true;

  @Field(() => Boolean, { nullable: true })
  onFriendBirthday?: false | true;

  @Field(() => Boolean, { nullable: true })
  onBirthDayWish?: false | true;
}
